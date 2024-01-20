from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///notes.db'
db = SQLAlchemy(app)

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    content = db.Column(db.Text, nullable=False)

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return render_template('notes.html')

@app.route('/notes', methods=['POST'])
def create_note():
    data = request.get_json()
    new_note = Note(content=data['content'])
    db.session.add(new_note)
    db.session.commit()
    return jsonify({'message': 'Notita creata', 'note': {'id': new_note.id, 'content': new_note.content}}), 201

@app.route('/notes/<int:note_id>', methods=['PUT'])
def save_note(note_id):
    note = Note.query.get(note_id)
    if not note:
        return jsonify({'message': 'Nu am gasit notita'}), 404

    data = request.get_json()
    note.content = data['content']
    db.session.commit()
    return jsonify({'message': 'Notita salvata!'})

@app.route('/notes', methods=['GET'])
def get_all_notes():
    notes = Note.query.all()
    result = []
    for note in notes:
        result.append({'id': note.id, 'content': note.content})
    return jsonify({'notes': result})


@app.route('/notes/<int:note_id>', methods=['GET'])
def get_note(note_id):
    note = Note.query.get(note_id)
    if note:
        return jsonify({'id': note.id, 'content': note.content})
    return jsonify({'message': 'Notita negasita'}), 404


@app.route('/notes/<int:note_id>', methods=['PUT'])
def edit_note(note_id):
    note = Note.query.get(note_id)
    if not note:
        return jsonify({'message': 'Notita negasita'}), 404

    data = request.get_json()
    note.content = data['content']
    db.session.commit()
    return jsonify({'message': 'Notita a fost schimbata cu succes!'})


@app.route('/notes/<int:note_id>', methods=['DELETE'])
def delete_note(note_id):
    note = Note.query.get(note_id)
    if not note:
        return jsonify({'message': 'Notita negasita'}), 404

    db.session.delete(note)
    db.session.commit()
    return jsonify({'message': 'Notita a fost stearsa'})

@app.route('/static/css/<path:filename>')
def serve_css(filename):
    return send_from_directory('static/css', filename, mimetype='text/css')

@app.route('/static/script/<path:filename>')
def serve_js(filename):
    return send_from_directory('static/script', filename, mimetype='application/javascript')

if __name__ == '__main__':
    app.run(debug=True)