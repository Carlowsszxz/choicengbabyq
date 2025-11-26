// Date Planner App
const places = document.querySelectorAll('.place-card');
const foodSection = document.getElementById('food-section');
const foodOptions = document.getElementById('food-options');
const result = document.getElementById('result');
const itinerary = document.getElementById('itinerary');
const restartBtn = document.getElementById('restart');
const modal = document.getElementById('modal');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');

let selectedPlace = '';
let selectedFood = '';
let currentStep = 'place'; // 'place' or 'food'

// Food options for each place
const foodData = {
    "Mega Mall": ["McDonald's", "Jollibee", "KFC", "Chowking", "Starbucks", "Mang Inasal"],
    "MOA": ["McDonald's", "Jollibee", "KFC", "Chowking", "Starbucks", "Mang Inasal"],
    "Cubao": ["McDonald's", "Jollibee", "KFC", "Chowking", "Starbucks", "Mang Inasal"],
    "BGC": ["McDonald's", "Jollibee", "KFC", "Chowking", "Starbucks", "Mang Inasal"],
    "Intramuros": ["McDonald's", "Jollibee", "KFC", "Chowking", "Starbucks", "Mang Inasal"],
    "Pasig River": ["McDonald's", "Jollibee", "KFC", "Chowking", "Riverside Cafe", "Mang Inasal"]
};

// Itinerary data
const itineraries = {
    "Mega Mall": {
        title: "Mega Mall Adventure!",
        steps: [
            "Take jeepney/UV Express from Antipolo to Mega Mall (1-1.5 hours)",
            "Shop and explore the mall together",
            "Enjoy delicious food at your chosen restaurant",
            "Watch a movie or play arcade games",
            "Return home with happy memories!"
        ]
    },
    "MOA": {
        title: "Mall of Asia Date!",
        steps: [
            "UV Express to Ayala, then bus/MRT to MOA (1.5-2 hours)",
            "Walk along the bay and enjoy the view",
            "Shop at amazing stores",
            "Dine at your favorite restaurant",
            "Try rides or enjoy the evening lights",
            "Head back home with beautiful memories!"
        ]
    },
    "Cubao": {
        title: "Cubao Exploration!",
        steps: [
            "Jeepney/UV Express to Cubao via Marcos Highway (1-1.5 hours)",
            "Explore the vibrant shops and markets",
            "Try amazing street food",
            "Find unique souvenirs",
            "Experience the lively atmosphere",
            "Return home after an exciting day!"
        ]
    },
    "BGC": {
        title: "BGC Modern Date!",
        steps: [
            "Jeepney or UV Express to Ayala (1 hour)",
            "Short walk to BGC",
            "Explore modern architecture and parks",
            "Enjoy upscale dining",
            "Stroll through beautifully lit streets",
            "Head back home with city vibes!"
        ]
    },
    "Intramuros": {
        title: "Historic Intramuros!",
        steps: [
            "Bus to Masinag, then LRT to Recto (1.5 hours)",
            "LRT transfer to UN Ave Station",
            "Walk to Intramuros (10-15 minutes)",
            "Explore historic walls and forts",
            "Take romantic photos",
            "Enjoy food in the historic area",
            "Return via LRT and bus (2-2.5 hours)"
        ]
    },
    "Pasig River": {
        title: "Scenic River Date!",
        steps: [
            "Jeepney or UV Express to Ayala (1 hour)",
            "Take Pasig River Ferry to Escolta",
            "Walk along the scenic river esplanade",
            "Enjoy riverside dining",
            "Relax and enjoy the view",
            "Return via ferry and transport home"
        ]
    }
};

// Initialize app
function init() {
    places.forEach(place => {
        place.addEventListener('click', () => selectPlace(place));
    });

    restartBtn.addEventListener('click', resetApp);
    yesBtn.addEventListener('click', confirmSelection);
    noBtn.addEventListener('click', hideModal);

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            hideModal();
        }
    });
}

// Select a place
function selectPlace(placeElement) {
    selectedPlace = placeElement.dataset.place;
    currentStep = 'food';
    showModal();
}

// Show food options
function showFoodOptions() {
    const foods = foodData[selectedPlace];
    foodOptions.innerHTML = '';

    foods.forEach(food => {
        const foodCard = document.createElement('div');
        foodCard.className = 'food-card bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105';
        foodCard.innerHTML = `<div class="text-center"><div class="text-2xl mb-2">${food}</div></div>`;
        foodCard.addEventListener('click', () => selectFood(food));
        foodOptions.appendChild(foodCard);
    });

    document.getElementById('places').classList.add('hidden');
    foodSection.classList.remove('hidden');
}

// Select food
function selectFood(food) {
    selectedFood = food;
    currentStep = 'confirm';
    showModal();
}

// Show modal
function showModal() {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

// Hide modal
function hideModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// Confirm selection
function confirmSelection() {
    hideModal();

    if (currentStep === 'food') {
        showFoodOptions();
    } else if (currentStep === 'confirm') {
        showResult();
    }
}

// Show final result
function showResult() {
    foodSection.classList.add('hidden');
    result.classList.remove('hidden');
    restartBtn.classList.remove('hidden');

    const itineraryData = itineraries[selectedPlace];
    itinerary.innerHTML = `
        <div class="text-center mb-6">
            <h3 class="text-2xl font-bold text-rose-600 mb-2">${itineraryData.title}</h3>
            <p class="text-lg text-gray-700">Food choice: <strong>${selectedFood}</strong></p>
        </div>
        <div class="space-y-3">
            ${itineraryData.steps.map((step, index) =>
                `<div class="bg-white rounded-lg p-4 shadow-md border-l-4 border-rose-400">
                    <div class="flex items-center">
                        <span class="bg-rose-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">${index + 1}</span>
                        <span class="text-gray-800">${step}</span>
                    </div>
                </div>`
            ).join('')}
        </div>
        <div class="text-center mt-6">
            <p class="text-rose-600 font-semibold">Enjoy your perfect date!</p>
        </div>
    `;
}

// Reset the app
function resetApp() {
    selectedPlace = '';
    selectedFood = '';
    currentStep = 'place';

    document.getElementById('places').classList.remove('hidden');
    foodSection.classList.add('hidden');
    result.classList.add('hidden');
    restartBtn.classList.add('hidden');

    // Clear selections
    document.querySelectorAll('.place-card, .food-card').forEach(card => {
        card.classList.remove('ring-4', 'ring-rose-400');
    });
}

// Start the app
document.addEventListener('DOMContentLoaded', init);