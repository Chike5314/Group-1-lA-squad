// Set minimum date to today
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// Popular routes data
const popularRoutes = [
    { from: 'Buea', to: 'Kumba', price: '2000XAF', duration: '1.5 hours' },
    { from: 'Buea', to: 'Yaounde', price: '5000XAF', duration: '6 hours' },
    { from: 'Buea', to: 'Douala', price: '2500XAF', duration: '1 hours' },
    { from: 'Buea', to: 'Bamenda', price: '10000XAF', duration: '10 hours' }
];

// Display popular routes
const routeCards = document.getElementById('routeCards');
popularRoutes.forEach(route => {
    const card = document.createElement('div');
    card.className = 'route-card';
    card.innerHTML = `
        <h3>${route.from} to ${route.to}</h3>
        <p>Price: ${route.price}</p>
        <p>Duration: ${route.duration}</p>
    `;
    routeCards.appendChild(card);
});

// Form submission
document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const date = document.getElementById('date').value;
    
    alert(`Searching buses from ${from} to ${to} on ${date}`);
    // Here you would typically make an API call to search for buses
});