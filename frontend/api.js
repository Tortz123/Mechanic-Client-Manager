async function requestJson(url, options) {
    const res = await fetch(url, options);
    const data = await res.json();

    if (!res.ok) {
        const error = new Error(data.msg || 'Request failed');
        error.status = res.status;
        throw error;
    }

    return data;
}

export async function loginMechanic(username, password) {
    return requestJson('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            userName: username, 
            passwordHash: password
        })
    });
}

export async function registerMechanic(username, email, password) {
    const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userName: username,
            email: email,
            passwordHash: password
        })
    });
    return res.json();
}

export async function getClients() {
    const res = await fetch('http://localhost:3000/api/clients', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    return res.json();
}

export async function createClient(username) {
    const res = await fetch('http://localhost:3000/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userName: username
        })
    });
    return res.json();
}

export const getCars = async (clientId) => {
    return requestJson(`http://localhost:3000/api/clients/${clientId}/cars`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
};

export const createCar = async (clientId, brand, model, year, vin) => {
    return requestJson(`http://localhost:3000/api/clients/${clientId}/cars`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            brand: brand,
            model: model,
            year: year,
            vin: vin
        })
    });
};

export const deleteCar = async (carId) => {
    const res = await fetch(`http://localhost:3000/api/cars/${carId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    return res.json();
};

export async function getServiceRecords(carId) {
    return requestJson(`/api/cars/${carId}/service-records`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function createServiceRecord(carId, serviceType, notes, kilometers, serviceDate) {
    const response = await fetch(`/api/cars/${carId}/service-records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            serviceType: serviceType,
            notes: notes,
            kilometers: kilometers,
            serviceDate: serviceDate
        })
    });
    return response.json();
}

export async function deleteServiceRecord(id) {
    const response = await fetch(`/api/service-records/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
}