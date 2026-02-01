// const form = document.getElementById('form');
// const username_input = document.getElementById('username-input');
// const email_input = document.getElementById('email-input');
// const password_input = document.getElementById('password-input');
// const repeat_password_input = document.getElementById('repeat-password-input');
// const error_message = document.getElementById('error-message')

// import { loginMechanic } from "./api.js";

// form.addEventListener('submit', async (e) => {

//     let errors = [];
//     // if there is a username then it's a signup form, else it's login
//     if (username_input) {
//         errors = getSignupFormErrors(username_input.value, email_input.value, password_input.value, repeat_password_input.value);
//     } else {
//         errors = getLoginFormErrors(email_input.value, password_input.value);
//     }

//     if (errors.length > 0) {
//         e.preventDefault();
//         error_message.innerText = errors.join('. ');
//         return;
//     }

//     // Only for login
//     if (!username_input) {
//         e.preventDefault();
//         try {
//             const data = await loginMechanic(username_input.value, password_input.value);
//             console.log(data);
//         } catch (err) {
//             error_message.innerText = 'Login failed.';
//         }
//     }
// });

// function getSignupFormErrors(username, email, password, repeatPassword) {
//     let errors =[];

//     if (username === '' || username == null) {
//         errors.push('Username is required');
//         username_input.parentElement.classList.add('Incorrect');
//     }
//     if (email === '' || email == null) {
//         errors.push('Email is required');
//         email_input.parentElement.classList.add('Incorrect');
//     }
//     if (password === '' || password == null) {
//         errors.push('Password is required');
//         password_input.parentElement.classList.add('Incorrect');
//     }
//     if (password.length < 8) {
//         errors.push('Password must have at least 8 characters');
//     }
//     if (password !== repeatPassword ) {
//         errors.push('Password does not match repeated password');
//         repeat_password_input.parentElement.classList.add('Incorrect');
//     }
//     return errors;
// }

// function getLoginFormErrors (username, password) {
//     let errors =[];

//     if (username === '' || username == null) {
//         errors.push('username is required');
//         email_input.parentElement.classList.add('Incorrect');
//     }
//     if (password === '' || password == null) {
//         errors.push('Password is required');
//         password_input.parentElement.classList.add('Incorrect');
//     }
//     if (password.length < 8) {
//         errors.push('Password must have at least 8 characters');
//     }
//     return errors;
// }


// const allInputs = [username_input, email_input, password_input, repeat_password_input].filter(input => input !== null);

// allInputs.forEach(input => {
//     input.addEventListener('input', () => {
//         if (input.parentElement.classList.contains('incorrect')) {
//             input.parentElement.classList.remove('incorrect');
//             error_message.innerText = '';
//         }
//     })
// })
