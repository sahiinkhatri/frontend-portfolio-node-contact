const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, '../public')));

// Where messages get saved
const MESSAGES_FILE = path.join(__dirname, 'messages.json');

// Make sure the file exists before we try to read/write it
if (!fs.existsSync(MESSAGES_FILE)) {
    fs.writeFileSync(MESSAGES_FILE, '[]');
}

// Contact route
app.post('/contact', (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    const newEntry = {
        name,
        email,
        phone,
        subject,
        message,
        receivedAt: new Date().toISOString()
    };

    console.log("📩 New Contact Message:");
    console.log(newEntry);

    try {
        const existing = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf-8'));
        existing.push(newEntry);
        fs.writeFileSync(MESSAGES_FILE, JSON.stringify(existing, null, 2));
    } catch (err) {
        console.error("⚠️ Failed to save message to file:", err);
        return res.status(500).json({ success: false, message: 'Something went wrong saving your message.' });
    }

    res.status(200).json({ success: true, message: 'Message received successfully!' });
});

// Simple way to view all saved messages in the browser
app.get('/messages', (req, res) => {
    const existing = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf-8'));
    res.json(existing);
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
