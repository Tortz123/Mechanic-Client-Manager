export async function loginMechanic(username, password) {
    const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            userName: username, 
            passwordHash: password
        })
    });
    return res.json();

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