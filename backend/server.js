const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, '../public')));

// Contact route
app.post('/contact', (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    console.log("📩 New Contact Message:");
    console.log({ name, email, phone, subject, message });

    res.status(200).json({ success: true, message: 'Message received successfully!' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
