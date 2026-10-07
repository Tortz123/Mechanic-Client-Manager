import { getCars, createCar, deleteCar } from "./api.js";

const table = document.getElementById('cars-table');
const form = document.getElementById('newCar-form');

const brand_input = document.getElementById('brand-input');
const model_input = document.getElementById('model-input');
const year_input = document.getElementById('year-input');
const vin_input = document.getElementById('vin-input');
const error_message = document.getElementById('error-message');

// Get clientId from URL
const params = new URLSearchParams(window.location.search);
const clientId = params.get("clientId");


form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const data = await createCar(clientId, brand_input.value, model_input.value, year_input.value, vin_input.value);
        console.log(data);
        form.reset();

    } catch (err) {
        showError(err);
    }
})


async function loadCars() {
    let cars;
    try {
        cars = await getCars(clientId);
    } catch (err) {
        showError(err);
        return;
    }
    console.log(clientId);
    console.log(cars);


    cars.forEach(car => {
        const row = table.insertRow();
        row.insertCell(0).innerText = car.brand;
        row.insertCell(1).innerText = car.model;
        row.insertCell(2).innerText = car.year;
        row.insertCell(3).innerText = car.vin;

        const deleteCell = row.insertCell(4);
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";

        deleteBtn.addEventListener("click", async (e) => {
            e.stopPropagation();
            const confirmed = confirm("Are you sure you want to delete this car?");
    
            if (!confirmed) return;

            await deleteCar(car.id);
            row.remove();
        });

        deleteCell.appendChild(deleteBtn);

        row.style.cursor = 'pointer';
        row.addEventListener('click', () => {
            window.location.href = `serviceRecords.html?carId=${car.id}`;
        });
        
    });
}

function showError(err) {
    if (err.status === 401) {
        error_message.innerText = 'Authentication required. Please log in.';
        return;
    }

    error_message.innerText = err.status === 404
        ? 'You do not have access to this client.'
        : 'Unable to load cars. Please try again.';
}

loadCars();
