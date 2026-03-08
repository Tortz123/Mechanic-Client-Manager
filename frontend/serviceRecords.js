import { getServiceRecords, createServiceRecord, deleteServiceRecord } from "./api.js";

const table = document.getElementById('serviceRecords-table');
const form = document.getElementById('newServiceRecord-form');

const serviceType_input = document.getElementById('serviceType-input');
const notes_input = document.getElementById('notes-input');
const kilometers_input = document.getElementById('kilometers-input');
const serviceDate_input = document.getElementById('serviceDate-input');

// Get carId from URL
const params = new URLSearchParams(window.location.search);
const carId = params.get("carId");


form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const data = await createServiceRecord(carId, serviceType_input.value, notes_input.value, kilometers_input.value, serviceDate_input.value);
        console.log(data);
        form.reset();

    } catch (err) {
        const error_message = document.getElementById('error-message');    
    }
})


async function loadServiceRecords() {
    const serviceRecords = await getServiceRecords(carId);
    console.log(carId);
    console.log(serviceRecords);


    serviceRecords.forEach(record => {
        const row = table.insertRow();
        row.insertCell(0).innerText = record.servicetype;
        row.insertCell(1).innerText = record.notes;
        row.insertCell(2).innerText = record.kilometers;
        row.insertCell(3).innerText = record.servicedate.split('T')[0];

        const deleteCell = row.insertCell(4);
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";

        deleteBtn.addEventListener("click", async (e) => {
            e.stopPropagation();
            const confirmed = confirm("Are you sure you want to delete this service record?");
    
            if (!confirmed) return;

            await deleteServiceRecord(record.id);
            row.remove();
        });

        deleteCell.appendChild(deleteBtn);
        
    });
}

loadServiceRecords();