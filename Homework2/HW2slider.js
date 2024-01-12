document.addEventListener("DOMContentLoaded", function () {
    const radioButtons = document.querySelectorAll('input[name="radioBut"]');
    const slides = document.querySelector('.slides');
    const manualButtons = document.querySelectorAll('.manualBut');

    let currentIndex = 0;
    let automaticSlideChange = true;
    let interval; //cat timp dureaza sa se schimbe singure pozele

    // functie care schimba slide-ul bazat pe indexul curent
    function changeSlide() {
        slides.style.marginLeft = -currentIndex * 100 + '%';
        radioButtons[currentIndex].checked = true;
        updateManualButtons();
        currentIndex = (currentIndex + 1) % radioButtons.length;
    }

    // Event listener pentru radio buttonuri
    radioButtons.forEach(function (radio, index) {
        radio.addEventListener('change', function () {
            currentIndex = index;
            changeSlide();
           
            // opreste schimbarea automata daca e apasat un radio button
            automaticSlideChange = false;
        });
    });

    // se schimba poza automat la 5 secunde
    interval = setInterval(function () {
        if (automaticSlideChange) {
            changeSlide();
        }
    }, 5000);

    // un apel initial al functiei ca atunci cand se da load la pagina sa fie bifat primul radio button si prima poza sa fie cea buna
    changeSlide();

    // Function to update the styling of manual navigation buttons
    
});
