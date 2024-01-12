function displaySuccess(message) {
    // functie care afiseaza un mesaj de success pe ecran cand toate validarile sunt ok
    const successContainer = document.getElementById('successContainer');
    successContainer.innerHTML = `<p class="success">${message}</p>`;
}

function clearSuccess() {
    // functie care sterge mesajul de success
    const successContainer = document.getElementById('successContainer');
    successContainer.innerHTML = '';
}

function displayError(message) {
    // functie care afiseaza eroare pe ecran
    const errorContainer = document.getElementById('errorContainer');
    errorContainer.innerHTML = `<p class="error">${message}</p>`;
}

function clearError() {
    // functie care sterge erorile
    const errorContainer = document.getElementById('errorContainer');
    errorContainer.innerHTML = '';
}

function submitForm(event) {
    event.preventDefault() //sa nu dispara erorile instant cand trimitem form-ul ptc se da refresh
    const email = document.getElementById('email-signUp').value;
    const password = document.getElementById('password-signUp').value;
    const retypePassword = document.getElementById('repeatPassword-signUp').value;

    if (!email || !password || !retypePassword) {
        clearSuccess()
        displayError('All fields must be filled');
        return;
    }

    if (password.length < 6) {
        clearSuccess()
        displayError('Password must be at least 6 characters long');
        return;
    }

    if (password.length > 20) {
        clearSuccess()
        displayError('Password must be less than 20 characters long');
        return;
    }

    if (password === 'password') {
        clearSuccess()
        displayError('Serios? Pune ba o parola adevarata');
        return;
    }

    if (password !== retypePassword) {
        clearSuccess()
        displayError('Your retyped password doesn\'t match');
        return;
    }

    if (password.length <= 6) {
        clearSuccess()
        displayError('The password must be atleast 6 char. long');
        return;
    }

    if (email || password || retypePassword) {
        clearError();
        displaySuccess('Successfully signed up');
        return;
    }

    if (password == retypePassword) {
        clearError();
        displaySuccess('Successfully signed up');
        return;
    }
}
