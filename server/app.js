const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const Caption = require('./models/Caption'); 
const captionRoutes = require('./routes/captionRoutes');
const { generateCaption } = require('./controllers/captionController'); 
const app = express();
const port = 3000;


// Connection URL
const mongoURI = 'mongodb://localhost:27017/Project6_2';

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

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

// Middleware for serving static files
app.use(express.static(path.join(__dirname, '../client')));

// Using routes
app.use('/api', captionRoutes);

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



