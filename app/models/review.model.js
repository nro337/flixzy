const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
    title: String,
    content: String,
    movie: String,
    rating: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Review', ReviewSchema);