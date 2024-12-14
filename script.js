// Select HTML elements
const loginForm = document.querySelector('form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.querySelector('.login');

// Handle form submission
loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form from reloading the page

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Validate input fields
    if (!username) {
        alert('Please enter your username.');
        return;
    }
    if (!password) {
        alert('Please enter your password.');
        return;
    }

    // Mock login logic
    if (username === 'admin' && password === '1234') {
        alert('Login successful!');
        // Redirect to another page
        window.location.href = '/dashboard'; // Example redirect
    } else {
        alert('Invalid username or password.');
    }
});

// Password visibility toggle
const togglePasswordVisibility = () => {
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
};

// Add a button for toggling password visibility dynamically
const passwordFieldContainer = passwordInput.parentElement;
const toggleButton = document.createElement('button');
< -- toggleButton.type = 'button'; // Prevent form submission
passwordFieldContainer.appendChild(toggleButton);

toggleButton.addEventListener('click', () => {
    const isPasswordVisible = passwordInput.type === 'text';
    togglePasswordVisibility();
    toggleButton.textContent = isPasswordVisible ? 'Show' : 'Hide';
});
