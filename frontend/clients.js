import { createClient, getClients } from "./api.js";

const form = document.getElementById('newClient-form');
const username_input = document.getElementById('username-input');
const table = document.getElementById('client-table');



form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const data = await createClient(username_input.value);
        console.log(data);
        form.reset();

    } catch (err) {
        const error_message = document.getElementById('error-message');    
    }
})


async function loadClients() {
    const clients = await getClients();
    console.log(clients);
    
    clients.forEach((client, index) => {
        const row = table.insertRow(index + 1);
        const cell = row.insertCell(0);
        cell.innerHTML = client.username;    

        cell.style.cursor = 'pointer';
        cell.addEventListener('click', () => {
            // sends client id into the url as a query parameter
            window.location.href = `cars.html?clientId=${client.id}`;
        });
        
    });
}

loadClients();
