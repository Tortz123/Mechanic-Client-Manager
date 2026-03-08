# Mechanic Client Manager

A full-stack web application for mechanics to manage their clients, cars, and service records.

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

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [PostgreSQL](https://www.postgresql.org/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**

   Run the schema file to create the required tables:
   ```bash
   psql -U your_username -d your_database -f schema.sql
   ```

4. **Configure environment variables**

   Create a `.env` file in the root directory:
   ```env
   DB_USER=your_username
   DB_HOST=localhost
   DB_NAME=your_database
   DB_PASSWORD=your_password
   DB_PORT=5432
   SESSION_SECRET=your_secret_key
   ```

5. **Start the server**

   For development (with nodemon auto-reload):
   ```bash
   npm run start:dev
   ```
   For production:
   ```bash
   node ./src/index.mjs
   ```

6. **Open the app**

   Visit [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** This app is designed to run locally. It connects to a local PostgreSQL instance.

---

## Usage

1. **Create an account** — Register as a mechanic to get started (new users can sign up directly on the app)
2. **Add a client** — Enter the client's name and contact details
3. **Add a car** — Link a vehicle (make, model, year) to a client
4. **Log a service record** — Record what work was done, when, and any notes

---

## Project Structure

```
mechanic_project/
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
│   ├── routes/         # Express route handlers
│   ├── utils/          # Utility/helper functions
│   └── index.mjs       # Entry point
├── schema.sql          # Database schema
├── .env                # Environment variables (not committed)
├── .gitignore
└── package.json
```

---

## License

This project is open source and available under the [MIT License](LICENSE).
