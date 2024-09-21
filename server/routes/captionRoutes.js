const express = require('express');
const multer = require('multer');
const path = require('path');
const { generateCaption, getCaptions } = require('../controllers/captionController');

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Routes
router.post('/generate-caption', upload.single('image'), generateCaption);
router.get('/captions', getCaptions);

module.exports = router;
