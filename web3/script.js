// Constants
const desks = Array(15).fill(false);
const membershipRates = { basic: 10, premium: 15, executive: 20 };
const teamRate = 25;

let revenue = { basic: 0, premium: 0, executive: 0, total: 0 };

// DOM Elements
const deskContainer = document.querySelector('.desk-container');
const bookingForm = document.getElementById('booking-form');
const totalChargeEl = document.getElementById('total-charge');
const revenueDashboard = document.getElementById('revenue-dashboard');

// Generate desks
function renderDesks() {
  deskContainer.innerHTML = '';
  desks.forEach((booked, index) => {
    const desk = document.createElement('div');
    desk.className = `desk ${booked ? 'booked' : ''}`;
    desk.textContent = index + 1;
    deskContainer.appendChild(desk);
  });
}

// Update revenue dashboard
function updateDashboard() {
  revenueDashboard.innerHTML = `
    <li>Basic Revenue: $${revenue.basic}</li>
    <li>Premium Revenue: $${revenue.premium}</li>
    <li>Executive Revenue: $${revenue.executive}</li>
    <li>Total Revenue: $${revenue.total}</li>
  `;
}

// Handle booking
function handleBooking(event) {
  event.preventDefault();
  const deskNumber = parseInt(event.target['desk-number'].value, 10) - 1;
  const membershipTier = event.target['membership-tier'].value;
  const hours = parseInt(event.target['hours'].value, 10);

  if (desks[deskNumber]) {
    alert('This desk is already booked!');
    return;
  }

  // Calculate charge
  const rate = deskNumber < 10 ? membershipRates[membershipTier] : teamRate;
  let totalCharge = rate * hours;
  if (hours > 3) {
    totalCharge *= 0.9; // Apply discount
  }

  // Update state
  desks[deskNumber] = true;
  revenue[membershipTier] += deskNumber < 10 ? totalCharge : 0;
  revenue.total += totalCharge;

  // Update UI
  totalChargeEl.textContent = `Total Charge: $${totalCharge.toFixed(2)}`;
  renderDesks();
  updateDashboard();
}

// Initial render
renderDesks();
updateDashboard();

// Event Listener
bookingForm.addEventListener('submit', handleBooking);
