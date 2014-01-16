'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var SpotSchema = new Schema({
    name: String,
    loc: {type: [Number], index: '2d'},
    address: String,
    city: String,
    zip: String,
    phone: String,
    type: String,
    url: String,
    open: Boolean
});

mongoose.model('Spot', SpotSchema);
