const langPlButton = document.getElementById('lang-pl');
const langEnButton = document.getElementById('lang-en');

// Zbieranie element�w z j�zykiem "pl" do tablicy
const plElements = Array.from(document.querySelectorAll('[data-lang="pl"]'));

// Zbieranie element�w z j�zykiem "en" do tablicy
const enElements = Array.from(document.querySelectorAll('[data-lang="en"]'));

// Funkcja do ustawienia widoczno�ci element�w
function setVisibility(elements, isVisible) {
    elements.forEach(element => {
        element.style.display = isVisible ? 'block' : 'none';
    });
}

// Ustaw domy�lny j�zyk na angielski
setVisibility(plElements, false);

// Obs�uga klikni�cia na przycisk zmiany j�zyka na polski
langPlButton.addEventListener('click', () => {
    setVisibility(plElements, true);
    setVisibility(enElements, false);
});

// Obs�uga klikni�cia na przycisk zmiany j�zyka na angielski
langEnButton.addEventListener('click', () => {
    setVisibility(plElements, false);
    setVisibility(enElements, true);
});

function openProject(button) {
    const portfolioItem = button.closest('.portfolio-item');
    portfolioItem.classList.add('opened');
    const closeButton = portfolioItem.querySelector('.close-button');
    closeButton.style.display = 'block';
    const description = portfolioItem.querySelector('.description');
    description.classList.add('hidden');

    const detailedInfo = portfolioItem.querySelector('.detailed-info');
    detailedInfo.style.display = 'block';

    const video = videoContainer.querySelector('video');
    video.play();
}

function closeProject(button) {
    const portfolioItem = button.closest('.portfolio-item');
    portfolioItem.classList.remove('opened');
    const videoContainer = portfolioItem.querySelector('.video-container');
    const description = portfolioItem.querySelector('.description');

    const detailedInfo = portfolioItem.querySelector('.detailed-info');
    detailedInfo.style.display = 'none';

    setTimeout(() => {
        description.classList.remove('hidden');
    }, 400); 

    const video = videoContainer.querySelector('video');
    video.play();

    button.style.display = 'none';
}

const portfolioSections = document.querySelectorAll('.portfolio-item'); // Pobierz wszystkie sekcje portfolio

portfolioSections.forEach((portfolioItem, index) => {
    const slidesContainer = portfolioItem.querySelector('.slides');
    const dotsContainer = portfolioItem.querySelector('.dots');
    const images = portfolioItem.querySelectorAll('.slides img');
    const totalImages = images.length;
    let currentIndex = 0;
    let intervalId; // Identyfikator interwa�u

    function updateDots() {
        const dots = portfolioItem.querySelectorAll('.dot');
        dots.forEach((dot, dotIndex) => {
            if (dotIndex === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function showSlide(index) {
        slidesContainer.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
        updateDots();
    }

    function startAutoSlide() {
        if (intervalId) {
            clearInterval(intervalId); // Zatrzymaj poprzedni interwa�, je�li istnieje
        }

        intervalId = setInterval(autoSlide, 5000); // Rozpocznij nowy interwa�
    }

    function autoSlide() {
        currentIndex = (currentIndex + 1) % totalImages;
        showSlide(currentIndex);
    }

    // Rozpocznij automatyczne przewijanie po za�adowaniu strony
    startAutoSlide();

    // Dodaj obs�ug� klikni�cia w kropk�
    images.forEach((_, imageIndex) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dotsContainer.appendChild(dot);

        dot.addEventListener('click', () => {
            clearInterval(intervalId); // Zatrzymaj interwa� po klikni�ciu kropki
            showSlide(imageIndex); // Przewi� do wybranego obrazka
            startAutoSlide(); // Rozpocznij automatyczne przewijanie ponownie
        });
    });

    updateDots();
});

window.addEventListener('load', () => {
    openSection('portfolio');
});

function openSection(sectionId) {
    const sections = document.querySelectorAll('section'); // Pobierz wszystkie sekcje

    // Iteruj przez sekcje i ukryj je wszystkie
    sections.forEach(section => {
        section.classList.remove('active'); // Usu� klas� "active" z wszystkich sekcji
    });

    // Poka� tylko wybran� sekcj�
    const selectedSection = document.getElementById(sectionId);
    selectedSection.classList.add('active'); // Dodaj klas� "active" do wybranej sekcji
}

function handleFormSubmit(event) {
    event.preventDefault(); // Zapobiegaj domy�lnej akcji formularza (prze�adowanie strony)

    // Pobierz elementy formularza
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const projectSelect = document.getElementById('project');
    const messageInput = document.getElementById('message');

    // Wyczy�� warto�ci p�l formularza
    nameInput.value = '';
    emailInput.value = '';
    projectSelect.selectedIndex = 0; // Wybierz pierwsz� opcj� (pusty wyb�r)
    messageInput.value = '';

    // Mo�esz tak�e doda� tutaj kod obs�ugi wysy�ki formularza, na przyk�ad do Formspree.
}

// Wywo�aj funkcj� aktualizacji j�zyka na pocz�tku
