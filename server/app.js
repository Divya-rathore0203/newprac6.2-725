const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

const mongoURI = 'mongodb+srv://s224772287:t5UNhnmajvnbD7tJ@sit725.0iuaj8y.mongodb.net/';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
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

// Define a schema and model for storing image captions
const ImageCaptionSchema = new mongoose.Schema({
    filename: String,
    caption: String,
    createdAt: { type: Date, default: Date.now }
});
const ImageCaption = mongoose.model('ImageCaption', ImageCaptionSchema);

// Handle POST request to generate image caption
app.post('/generate-caption', upload.single('image'), (req, res) => {
    if (!req.file) {
        console.error('No file uploaded.');
        return res.status(400).json({ error: 'No file uploaded.' });
    }
    
    console.log('File uploaded:', req.file);

    // Placeholder for caption generation logic
    const generatedCaption = 'This is a simulated caption for the image.';
    
    // Save the image caption to the database
    const newCaption = new ImageCaption({
        filename: req.file.filename,
        caption: generatedCaption
    });

    try {
        await newCaption.save();
    res.json({ caption: generatedCaption });
    } catch (err) {
        console.error('Error saving caption to database:', err);
        res.status(500).json({ error: 'Failed to save caption to database.' });
    }
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
