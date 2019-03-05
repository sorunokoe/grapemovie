
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const movie = require('./movie')

const userSchema  = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    favorites: [movie.schema]
});

userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

module.exports = mongoose.model("user", userSchema)