const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    id: String,
    name: String,
    image: String,
    premiered: String,
    rating: String
});


module.exports = mongoose.model('movie', movieSchema);