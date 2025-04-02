// backend/server.js
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

let users = [];

// Registrierung
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;
    const newUser = { id: Date.now(), username, email, password };
    users.push(newUser);

    // Optional: in Datei schreiben (simuliert Datenbank)
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

    res.status(201).json({ message: 'User registered', user: newUser });
});

// Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.json({ message: 'Login successful', user });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
