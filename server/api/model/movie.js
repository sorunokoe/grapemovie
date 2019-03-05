const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    id: String,
    name: String,
    image: String,
    rating: String,
    premiered: String,
    summary: String
});


module.exports = mongoose.model('movie', movieSchema);