const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadInvoice, downloadJSON, downloadXML } = require('../controllers/invoiceController');

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('invoice'), uploadInvoice);
router.post('/download/json', downloadJSON);
router.post('/download/xml', downloadXML);

module.exports = router;
