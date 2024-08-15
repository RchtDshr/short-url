const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortID: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true
    },
    visitHistory: [
        {timestamp: {type : Number}}
    ],
    //to store all the urls that a specific user created
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}, {timestamps: true});

const URL = mongoose.model('url', urlSchema);

module.exports = URL;