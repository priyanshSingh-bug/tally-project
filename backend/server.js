require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Routes
const invoiceRoutes = require('./routes/invoiceRoutes');
app.use('/api/invoice', invoiceRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send('Invoice Converter API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
