module.exports = (app) => {
    const reviews = require('../controllers/review.controller.js');
    const cors = require('cors');
    app.use(cors());
    app.options("*", cors());

    // Create a new Review
    app.post('/filmreviews', cors(), reviews.create);

    // Retrieve all Reviews
    app.get('/filmreviews', cors(), reviews.findAll);

    // Retrieve a single Review with reviewId
    app.get('/filmreviews/:reviewId', cors(), reviews.findOne);

    // Update a Review with reviewId
    app.put('/filmreviews/:reviewId', reviews.update);

    // Delete a Review with reviewId
    app.delete('/filmreviews/:reviewId', reviews.delete);
}