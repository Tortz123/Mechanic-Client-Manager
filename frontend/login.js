const form = document.getElementById('login-form');
const username_input = document.getElementById('username-input');
const password_input = document.getElementById('password-input');
const error_message = document.getElementById('error-message');

import { loginMechanic } from "./api.js";

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const errors = getLoginFormErrors(
        username_input.value, 
        password_input.value
    );
    
    if (errors.length > 0) {
        error_message.innerText = errors.join('. ');
        return;
    }
    try {
        const data = await loginMechanic(username_input.value, password_input.value);
        console.log(data);
        
        // redirect to clients pape on successful login
        window.location.href = 'clients.html';
    } catch (err) {
        error_message.innerText = 'Login failed.';
    }
});

function getLoginFormErrors(username, password) {
    let errors = [];
    if (username === '' || username == null) {
        errors.push('Username is required');
        username_input.parentElement.classList.add('Incorrect');
    }
    if (password === '' || password == null) {
        errors.push('Password is required');
        password_input.parentElement.classList.add('Incorrect');
    }
    if (password.length < 8) {
        errors.push('Password must have at least 8 characters');
    }
    return errors;
}

[username_input, password_input].forEach(input => {
    input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('Incorrect')) {
            input.parentElement.classList.remove('Incorrect');
            error_message.innerText = '';
        }
    });
});
