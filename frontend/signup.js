const form = document.getElementById('signup-form');
const username_input = document.getElementById('username-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input');
const error_message = document.getElementById('error-message');

import { registerMechanic } from "./api.js";

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const errors = getSignupFormErrors(
        username_input.value,
        email_input.value,
        password_input.value,
        repeat_password_input.value
    );
    if (errors.length > 0) {
        error_message.innerText = errors.join('. ');
        return;
    }
    try {
            const data = await registerMechanic(username_input.value, email_input.value, password_input.value);
            console.log(data);
            form.reset();
        } catch (err) {
            error_message.innerText = 'register failed.';
        }
    
});

function getSignupFormErrors(username, email, password, repeatPassword) {
    let errors = [];
    if (username === '' || username == null) {
        errors.push('Username is required');
        username_input.parentElement.classList.add('Incorrect');
    }
    if (email === '' || email == null) {
        errors.push('Email is required');
        email_input.parentElement.classList.add('Incorrect');
    }
    if (password === '' || password == null) {
        errors.push('Password is required');
        password_input.parentElement.classList.add('Incorrect');
    }
    if (password.length < 8) {
        errors.push('Password must have at least 8 characters');
    }
    if (password !== repeatPassword) {
        errors.push('Password does not match repeated password');
        repeat_password_input.parentElement.classList.add('Incorrect');
    }
    return errors;
}

[username_input, email_input, password_input, repeat_password_input].forEach(input => {
    input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('Incorrect')) {
            input.parentElement.classList.remove('Incorrect');
            error_message.innerText = '';
        }
    });
});
