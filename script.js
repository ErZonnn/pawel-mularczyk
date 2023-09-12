const langPlButton = document.getElementById('lang-pl');
const langEnButton = document.getElementById('lang-en');

// Zbieranie elementów z jêzykiem "pl" do tablicy
const plElements = Array.from(document.querySelectorAll('[data-lang="pl"]'));

// Zbieranie elementów z jêzykiem "en" do tablicy
const enElements = Array.from(document.querySelectorAll('[data-lang="en"]'));

// Funkcja do ustawienia widocznoœci elementów
function setVisibility(elements, isVisible) {
    elements.forEach(element => {
        element.style.display = isVisible ? 'block' : 'none';
    });
}

// Ustaw domyœlny jêzyk na angielski
setVisibility(plElements, false);

// Obs³uga klikniêcia na przycisk zmiany jêzyka na polski
langPlButton.addEventListener('click', () => {
    setVisibility(plElements, true);
    setVisibility(enElements, false);
});

// Obs³uga klikniêcia na przycisk zmiany jêzyka na angielski
langEnButton.addEventListener('click', () => {
    setVisibility(plElements, false);
    setVisibility(enElements, true);
});

function openProjectByPortfolioId(portfolioId) {
    const portfolioItems = document.querySelectorAll('.portfolio-item'); // Pobierz wszystkie projekty

    // Iteruj przez projekty i znajdŸ ten o odpowiednim portfolio-id
    portfolioItems.forEach(portfolioItem => {
        const itemPortfolioId = portfolioItem.getAttribute('portfolio-id');
        if (itemPortfolioId === portfolioId) {
            openProject(portfolioItem.querySelector('.more-info-button')); // Wywo³aj funkcjê otwierania projektu
        }
    });
}

// Nas³uchuj zdarzenia zmiany fragmentu URL
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1); // Pobierz fragment URL, usuwaj¹c znak "#" na pocz¹tku

    // SprawdŸ, czy fragment URL jest niepusty
    if (hash) {
        openProjectByPortfolioId(hash); // Otwórz projekt na podstawie fragmentu URL
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
    let intervalId; // Identyfikator interwa³u

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
            clearInterval(intervalId); // Zatrzymaj poprzedni interwa³, jeœli istnieje
        }

        intervalId = setInterval(autoSlide, 5000); // Rozpocznij nowy interwa³
    }

    function autoSlide() {
        currentIndex = (currentIndex + 1) % totalImages;
        showSlide(currentIndex);
    }

    // Rozpocznij automatyczne przewijanie po za³adowaniu strony
    startAutoSlide();

    // Dodaj obs³ugê klikniêcia w kropkê
    images.forEach((_, imageIndex) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dotsContainer.appendChild(dot);

        dot.addEventListener('click', () => {
            clearInterval(intervalId); // Zatrzymaj interwa³ po klikniêciu kropki
            showSlide(imageIndex); // Przewiñ do wybranego obrazka
            startAutoSlide(); // Rozpocznij automatyczne przewijanie ponownie
        });
    });

    updateDots();
});

// Funkcja otwieraj¹ca sekcjê na podstawie identyfikatora
function openSection(sectionId) {
    const sections = document.querySelectorAll('section'); // Pobierz wszystkie sekcje

    // Iteruj przez sekcje i ukryj je wszystkie
    sections.forEach(section => {
        section.classList.remove('active'); // Usuñ klasê "active" z wszystkich sekcji
    });

    // Poka¿ tylko wybran¹ sekcjê
    const selectedSection = document.getElementById(sectionId);
    selectedSection.classList.add('active'); // Dodaj klasê "active" do wybranej sekcji
}

// Funkcja otwieraj¹ca sekcjê na podstawie fragmentu URL
function openSection(sectionId) {
    const sections = document.querySelectorAll('section'); // Pobierz wszystkie sekcje

    // Iteruj przez sekcje i ukryj je wszystkie
    sections.forEach(section => {
        section.classList.remove('active'); // Usuñ klasê "active" z wszystkich sekcji
    });

    // Poka¿ tylko wybran¹ sekcjê
    const selectedSection = document.getElementById(sectionId);
    selectedSection.classList.add('active'); // Dodaj klasê "active" do wybranej sekcji
}

// Funkcja otwieraj¹ca sekcjê na podstawie fragmentu URL
function openSectionFromURL() {
    const hash = window.location.hash.slice(1); // Pobierz fragment URL, usuwaj¹c znak "#" na pocz¹tku
    const sections = document.querySelectorAll('section'); // Pobierz wszystkie sekcje

    // Jeœli nie ma fragmentu URL, otwórz sekcjê "About" na starcie
    if (!hash) {
        openSection('about');
    } else {
        // Iteruj przez sekcje i ukryj je wszystkie
        sections.forEach(section => {
            section.classList.remove('active'); // Usuñ klasê "active" z wszystkich sekcji
        });

        // Wyodrêbnij identyfikator przycisku z URL (po znaku "/")
        const indexOfSlash = hash.indexOf('/');
        const buttonId = indexOfSlash !== -1 ? hash.substring(indexOfSlash + 1) : hash;

        const hashParts = hash.split('/'); // Rozbij ci¹g znaków na czêœci za pomoc¹ '/'
        const newHash = hashParts[0];
        console.log(newHash);

        const selectedSection = document.getElementById(newHash);
        if (selectedSection) {
            selectedSection.classList.add('active'); // Dodaj klasê "active" do wybranej sekcji
        }

        // ZnajdŸ odpowiedni przycisk na podstawie identyfikatora
        const button = document.querySelector(`[button-id="${buttonId}"]`);

        if (button) {
            setTimeout(() => {
                openProject(button);
            }, 200);
        }
    }     
}

// Nas³uchuj zdarzenia za³adowania strony
window.addEventListener('load', () => {
    openSectionFromURL(); // Wywo³aj funkcjê przy ³adowaniu strony
});

// Nas³uchuj zdarzenia zmiany fragmentu URL
window.addEventListener('hashchange', openSectionFromURL);

document.addEventListener('DOMContentLoaded', function () {
    const updateNotesButton = document.getElementById('update-notes-button');
    const detailedInfoContent = document.querySelector('.detailed-info-content');

    updateNotesButton.addEventListener('click', function () {
        // Przewiñ do elementu, który chcesz wyœwietliæ po klikniêciu "Update Notes"
        const elementToScrollTo = document.getElementById('element-to-scroll-to');

        if (elementToScrollTo) {
            elementToScrollTo.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

function handleFormSubmit(event) {
    event.preventDefault(); // Zapobiegaj domyœlnej akcji formularza (prze³adowanie strony)

    // Pobierz elementy formularza
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const projectSelect = document.getElementById('project');
    const messageInput = document.getElementById('message');

    // Wyczyœæ wartoœci pól formularza
    nameInput.value = '';
    emailInput.value = '';
    projectSelect.selectedIndex = 0; // Wybierz pierwsz¹ opcjê (pusty wybór)
    messageInput.value = '';

    // Mo¿esz tak¿e dodaæ tutaj kod obs³ugi wysy³ki formularza, na przyk³ad do Formspree.
}

// Wywo³aj funkcjê aktualizacji jêzyka na pocz¹tku
