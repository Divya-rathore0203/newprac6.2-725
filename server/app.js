const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const Caption = require('./models/Caption'); // Assuming you have a Caption model
const app = express();
const port = 3000;

// Connection URL
const mongoURI = 'mongodb://localhost:27017/Project6_2';

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Set up multer for file upload handling
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, '../client')));

// Handle POST request to generate image caption
app.post('/generate-caption', upload.single('image'), (req, res) => {
    if (!req.file) {
        console.error('No file uploaded.');
        return res.status(400).json({ error: 'No file uploaded.' });
    }
    
    console.log('File uploaded:', req.file);

    // Placeholder for caption generation logic
    const generatedCaption = 'This is a simulated caption for the image.';
    
    // Save to MongoDB
    const newCaption = new Caption({
        caption: generatedCaption,
        imageUrl: req.file.path, // Or any other path you use
    });
    
    res.json({ caption: generatedCaption });

});

// Catch-all route for any other requests
app.use((req, res) => {
    res.status(404).send('Not Found');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
module.exports = app;



