document.addEventListener("DOMContentLoaded", function () {
    const radioButtons = document.querySelectorAll('input[name="radioBut"]');
    const slides = document.querySelector('.slides');

    let currentIndex = 1;
    let automaticSlideChange = true;
    let intervalID;

    // functie care schimba slide-ul in functie de currentIndex 
    function changeSlide() {
        slides.style.marginLeft = -currentIndex * 100 + '%';
        radioButtons[currentIndex].checked = true;
        currentIndex = (currentIndex + 1) % radioButtons.length;
    }

    // Event listener pt radio buttonuri
    radioButtons.forEach(function (radio, index) {
        radio.addEventListener('change', function () {
            currentIndex = index;
            changeSlide();
            // opreste schimbarea automata a slideului daca e apasat un radio button
            automaticSlideChange = false;
            clearInterval(intervalID);
        });
    });

    // schimba automat slideul odata la 3 secunde
    intervalID = setInterval(function () {
        if (automaticSlideChange) {
            changeSlide();
        }
    }, 5000);
});
