# Mechanic Client Manager

A full-stack web application for mechanics to manage their clients, cars, and service records.

<img width="1900" height="600" alt="image" src="https://github.com/user-attachments/assets/3c7445b0-9117-4c1e-9ab3-7fb05df98dc9" />


<img width="1894" height="547" alt="image" src="https://github.com/user-attachments/assets/bd4aa3ae-f69f-48a8-8efc-f81526474a89" />

<img width="1889" height="687" alt="image" src="https://github.com/user-attachments/assets/7d527858-13e8-4ef9-abbe-dcd5151f6986" />


<img width="1888" height="868" alt="image" src="https://github.com/user-attachments/assets/39fba380-808b-4957-bc17-0f00d0c1be42" />


---

## Features

- **Client Management** — Add, view, edit, and delete clients
- **Car Tracking** — Each client can have multiple cars associated with their profile
- **Service Records** — Log and track service history for each vehicle
- **Clean UI** — Simple, easy-to-use interface built with HTML, CSS, and JavaScript

---

## Tech Stack

| Layer    | Technology              |
|----------|-------------------------|
| Frontend | HTML, CSS, JavaScript   |
| Backend  | Node.js, Express.js     |
| Database | PostgreSQL               |

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v20.19 or higher (v22 or v24 LTS recommended)
- [PostgreSQL](https://www.postgresql.org/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tortz123/Mechanic-Client-Manager.git
   cd Mechanic-Client-Manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**

    Create the database first (in pgAdmin, or in psql with `CREATE DATABASE your_database;`), then run the schema file:

      ```
      psql -U your_username -d your_database -f schema.sql
      ```
      
      **Windows:** if you get "psql is not recognized", either add `C:\Program Files\PostgreSQL\18\bin` to your PATH or run it with the full path:
      
      ```
      & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U your_username -d your_database -f schema.sql
      ```

4. **Configure environment variables**

   Copy the example file, then fill in your own values:
   ```bash
   cp .env.example .env
   ```
   (Windows PowerShell: `Copy-Item .env.example .env`)

   | Variable | What to put there |
   |----------|-------------------|
   | `DATABASE_URL` | Your Postgres connection string: `postgres://USER:PASSWORD@localhost:5432/DATABASE`, using the user, password, and database from step 3. URL-encode special characters in the password (e.g. `@` → `%40`) |
   | `SESSION_SECRET` | A long random string. Generate one with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
   | `PORT` | Optional, defaults to `3000` |
   | `NODE_ENV` | `development` for local use |

   `.env` is gitignored, so your secrets never get committed. The server refuses to start, with a message naming the variable, if `DATABASE_URL` or `SESSION_SECRET` is missing.

5. **Start the server**

   For development (auto-restarts when you save a file):
   ```bash
   npm run dev
   ```
   For production:
   ```bash
   npm start
   ```

6. **Open the app**

   Visit [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** This app is designed to run locally. It connects to a local PostgreSQL instance.

### Useful commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start the server with auto-restart (nodemon) |
| `npm start` | Start the server once |
| `npm run lint` | Check the code with ESLint |

---

## Usage

1. **Create an account** — Register as a mechanic to get started (new users can sign up directly on the app)
2. **Add a client** — Enter the client's name and contact details
3. **Add a car** — Link a vehicle (make, model, year) to a client
4. **Log a service record** — Record what work was done, when, and any notes

---

## Project Structure

```
Mechanic-Client-Manager/
├── frontend/
│   ├── api.js
│   ├── cars.html / cars.js
│   ├── clients.html / clients.js
│   ├── serviceRecords.html / serviceRecords.js
│   ├── login.html / login.js
│   ├── signup.html / signup.js
│   ├── index.html
│   └── style.css
├── src/
│   ├── middleware/     # Express middleware (e.g. requireAuth)
│   ├── routes/         # Express route handlers
│   ├── utils/          # Helpers: database pool, env check
│   ├── app.mjs         # Builds and exports the Express app
│   └── index.mjs       # Entry point: loads config and starts the server
├── schema.sql          # Database schema
├── .env.example        # Template for .env (copy it and fill in values)
├── .env                # Your environment variables (not committed)
├── eslint.config.mjs   # ESLint configuration
├── .gitignore
└── package.json
```

---

## License

This project is open source and available under the [MIT License](LICENSE).
