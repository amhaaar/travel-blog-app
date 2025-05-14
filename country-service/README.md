# Secure API Middleware

A simple and secure API middleware built with Node.js, Express, and SQLite. This app allows users to register, log in, generate API keys, and access protected country data using those keys.

---

## 🔧 Features

- ✅ User Registration & Login (with sessions)
- ✅ API Key Generation & Tracking
- ✅ Protected API Endpoint to fetch country data
- ✅ Frontend country viewer with search and flag display
- ✅ SQLite database with usage tracking
- ✅ Styled dashboard and countries page

---

## 🛠 Tech Stack

- Node.js + Express
- SQLite (`sqlite3`)
- EJS (for frontend views)
- Express Sessions
- REST API with API Key Authentication

---

## 🚀 How to Run Locally

1. **Clone the repo**
```bash
git clone https://github.com/amhaaar/secure-api-project.git
cd secure-api-project
```

2. **Install dependencies**
npm install


3. **Add .env file **
SESSION_SECRET=your-secret-key


4. **Start Server**
node app.js

5. **Open in Browser**
"http://localhost:3000"


## 🔑 How It Works
1. Go to **/auth/register** → Register a user

2. Log in via **/auth/login**

3. View your API key on **/admin/dashboard**

4. Navigate to **/admin/countries** → Paste API key to view data

5. Search and find specific country 


## ✍️ Author
* M. Amhar M. Fairoze
* Student ID: 20210734
* UoW ID: w1867698
* Module: Advanced Server-Side Web Programming (6COSC022W)
* Coursework: 1










