'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    imagePath: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    genre: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    actor: {
        type: String,
        required: true
    },
    rate:{
      type: String,
      required: false
    },
    comments:{
      type: String,
      required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', schema);
