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

function openProjectByPortfolioId(portfolioId) {
    const portfolioItems = document.querySelectorAll('.portfolio-item'); // Pobierz wszystkie projekty

    // Iteruj przez projekty i znajd� ten o odpowiednim portfolio-id
    portfolioItems.forEach(portfolioItem => {
        const itemPortfolioId = portfolioItem.getAttribute('portfolio-id');
        if (itemPortfolioId === portfolioId) {
            openProject(portfolioItem.querySelector('.more-info-button')); // Wywo�aj funkcj� otwierania projektu
        }
    });
}

// Nas�uchuj zdarzenia zmiany fragmentu URL
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1); // Pobierz fragment URL, usuwaj�c znak "#" na pocz�tku

    // Sprawd�, czy fragment URL jest niepusty
    if (hash) {
        openProjectByPortfolioId(hash); // Otw�rz projekt na podstawie fragmentu URL
    }
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

// Funkcja otwieraj�ca sekcj� na podstawie identyfikatora
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

// Funkcja otwieraj�ca sekcj� na podstawie fragmentu URL
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

// Funkcja otwieraj�ca sekcj� na podstawie fragmentu URL
function openSectionFromURL() {
    const hash = window.location.hash.slice(1); // Pobierz fragment URL, usuwaj�c znak "#" na pocz�tku
    const sections = document.querySelectorAll('section'); // Pobierz wszystkie sekcje

    // Je�li nie ma fragmentu URL, otw�rz sekcj� "About" na starcie
    if (!hash) {
        openSection('about');
    } else {
        // Iteruj przez sekcje i ukryj je wszystkie
        sections.forEach(section => {
            section.classList.remove('active'); // Usu� klas� "active" z wszystkich sekcji
        });

        // Wyodr�bnij identyfikator przycisku z URL (po znaku "/")
        const indexOfSlash = hash.indexOf('/');
        const buttonId = indexOfSlash !== -1 ? hash.substring(indexOfSlash + 1) : hash;

        const hashParts = hash.split('/'); // Rozbij ci�g znak�w na cz�ci za pomoc� '/'
        const newHash = hashParts[0];
        console.log(newHash);

        const selectedSection = document.getElementById(newHash);
        if (selectedSection) {
            selectedSection.classList.add('active'); // Dodaj klas� "active" do wybranej sekcji
        }

        // Znajd� odpowiedni przycisk na podstawie identyfikatora
        const button = document.querySelector(`[button-id="${buttonId}"]`);

        if (button) {
            setTimeout(() => {
                openProject(button);
            }, 200);
        }
    }     
}

// Nas�uchuj zdarzenia za�adowania strony
window.addEventListener('load', () => {
    openSectionFromURL(); // Wywo�aj funkcj� przy �adowaniu strony
});

// Nas�uchuj zdarzenia zmiany fragmentu URL
window.addEventListener('hashchange', openSectionFromURL);

document.addEventListener('DOMContentLoaded', function () {
    const updateNotesButton = document.getElementById('update-notes-button');
    const detailedInfoContent = document.querySelector('.detailed-info-content');

    updateNotesButton.addEventListener('click', function () {
        // Przewi� do elementu, kt�ry chcesz wy�wietli� po klikni�ciu "Update Notes"
        const elementToScrollTo = document.getElementById('element-to-scroll-to');

        if (elementToScrollTo) {
            elementToScrollTo.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

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
