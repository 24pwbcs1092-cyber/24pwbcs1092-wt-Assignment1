// Initial events array with sample data
const events = [
    { id: 1, name: 'Tech Conference', date: '2024-12-15', description: 'Annual tech conference featuring industry leaders.' },
    { id: 2, name: 'Music Festival', date: '2024-11-20', description: 'Outdoor music event with multiple artists.' },
    { id: 3, name: 'Coding Workshop', date: '2025-01-10', description: 'Hands-on coding workshop for beginners.' },
    { id: 4, name: 'Art Exhibition', date: '2025-02-05', description: 'Display of contemporary art pieces.' }
];

// DOM element references
const eventForm = document.getElementById('event-form');
const eventName = document.getElementById('event-name');
const eventDate = document.getElementById('event-date');
const eventDescription = document.getElementById('event-description');
const warning = document.getElementById('warning');
const searchInput = document.getElementById('search-input');
const eventList = document.getElementById('event-list');
const yearSpan = document.getElementById('year');

// Function to render events to the DOM
function renderEvents(eventsToRender = events) {
    eventList.innerHTML = '';
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate date comparison

    eventsToRender.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';

        const eventDateObj = new Date(event.date);
        if (eventDateObj < today) {
            eventCard.classList.add('past');
        }

        eventCard.innerHTML = `
            <h3 class="event-name">${event.name}</h3>
            <p class="event-date">${event.date}</p>
            <p class="event-description">${event.description}</p>
            <button class="delete-btn" data-id="${event.id}">Delete</button>
        `;

        eventList.appendChild(eventCard);
    });
}

// Function to add a new event
function addEvent(e) {
    e.preventDefault();

    // Validate form fields
    if (!eventName.value.trim() || !eventDate.value || !eventDescription.value.trim()) {
        warning.classList.remove('hidden');
        return;
    }

    warning.classList.add('hidden');

    // Create new event object
    const newEvent = {
        id: Date.now(), // Use timestamp as unique ID
        name: eventName.value.trim(),
        date: eventDate.value,
        description: eventDescription.value.trim()
    };

    // Add to events array, sort, and re-render
    events.push(newEvent);
    sortEvents();
    renderEvents();

    // Reset form
    eventForm.reset();
}

// Function to delete an event
function deleteEvent(e) {
    if (e.target.classList.contains('delete-btn')) {
        const confirmed = confirm('Are you sure you want to delete this event?');
        if (confirmed) {
            const id = parseInt(e.target.dataset.id);
            const index = events.findIndex(event => event.id === id);
            if (index > -1) {
                events.splice(index, 1);
                renderEvents();
            }
        }
    }
}

// Function to sort events by date (ascending)
function sortEvents() {
    events.sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Function to filter events based on search query
function filterEvents() {
    const query = searchInput.value.toLowerCase().trim();
    const filtered = events.filter(event =>
        event.name.toLowerCase().includes(query) ||
        event.date.includes(query)
    );
    renderEvents(filtered);
}

// Event listeners
eventForm.addEventListener('submit', addEvent);
eventList.addEventListener('click', deleteEvent);
searchInput.addEventListener('input', filterEvents);

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    yearSpan.textContent = new Date().getFullYear();
    sortEvents();
    renderEvents();
});