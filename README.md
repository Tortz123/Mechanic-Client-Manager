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

    Create the database first (in pgAdmin, or in psql with `CREATE DATABASE your_database;`), then run the schema file:

      ```
      psql -U your_username -d your_database -f schema.sql
      ```
      
      **Windows:** if you get "psql is not recognized", either add `C:\Program Files\PostgreSQL\18\bin` to your PATH or run it with the full path:
      
      ```
      & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U your_username -d your_database -f schema.sql
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
