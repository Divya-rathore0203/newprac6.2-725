const Caption = require('../models/Caption');

// Generate caption
const generateCaption = (req, res) => {
   
    if (!req.file) {
        console.log('No file uploaded'); // Log in case of no file
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    // Log the uploaded file details
    console.log('File uploaded successfully:', req.file);

    // Placeholder logic for generating a caption
    const generatedCaption = 'Every picture tells a story, what is yours?';

    // Create a new Caption instance 
    const newCaption = new Caption({
        caption: generatedCaption,
        imageUrl: req.file.path,
    });

    // Save the caption to MongoDB
    newCaption.save()
        .then(() => {
            console.log('Caption saved to database.'); // Log if saving was successful
            return res.json({ caption: generatedCaption, imageUrl: req.file.path });
        })
        .catch((err) => {
            console.error('Error saving caption:', err); // Log any error that occurs while saving
            return res.status(500).json({ error: err.message });
        });
};

// Get all captions from the database
const getCaptions = (req, res) => {
    Caption.find()
        .then((captions) => res.json(captions))
        .catch((err) => res.status(500).json({ error: err.message }));
};

// Export both functions
module.exports = { generateCaption, getCaptions };
