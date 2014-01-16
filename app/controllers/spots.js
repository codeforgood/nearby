'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Spot = mongoose.model('Spot'),
    _ = require('lodash');

/**
 * List of Spots
 */
exports.all = function(req, res) {
    Spot.find().sort('name').select('name address city zip phone url type loc').exec(function(err, spots) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(spots);
        }
    });
};

// TODO: Refactor
/*
exports.getAllSpots = function(req, res){

    var l_val = 10, stype, lat, lng;

    if (typeof req.query.stype !== 'undefined' 
        && req.query.stype !== null){
        stype = req.query.stype
    }
    
    if (typeof req.query.limit !== 'undefined' 
        && req.query.limit !== null
        && !isNaN(req.query.limit)){
        l_val = parseInt(req.query.limit)
    }

    if (typeof req.query.lng !== 'undefined' 
        && req.query.lng !== null 
        && !isNaN(req.query.lng)
        && req.query.lng >= -180
        && req.query.lng < 180){
        lng = parseFloat(req.query.lng)
    }

    if (typeof req.query.lat !== 'undefined' 
        && req.query.lat !== null 
        && !isNaN(req.query.lat)
        && req.query.lat >= -180
        && req.query.lat < 180){
        lat = parseFloat(req.query.lat)
    }
    console.log('Finding Best Matching Spots');
    var query = SpotModel.find({})
                    .select('name address city zip phone url type loc');

    if(typeof stype !== 'undefined'){
        console.log('Type: ' + stype);
        query.where('spottype').equals(stype)
    }

    //add the geospatial query criteria if lat and lng are available
    if(typeof lng !== 'undefined' && typeof lat !== 'undefined'){
        console.log('Around, lng: ' + lng + ', lat: ' + lat);
        query.where('loc').near(lng,lat);
    }
    //set the result limit
    console.log('limit: ' + l_val);
    query.limit(l_val);
    
    query.exec(function (err, spots) {

        res.setHeader('Content-Type', 'application/json');
        if (err) {
            console.log(err);
            res.send(500);
        } 
        return res.send(spots);
    });
};

exports.getSpot = function(req, res){

    var id;
    
    if(typeof req.params.id !== 'undefined' && req.params.id){
        id = req.params.id
    }

    if (! id.match(/^[0-9a-fA-F]{24}$/)) {
        console.log('Invalid ObjectId: ' + id);
        res.send(400);
    }else{
        console.log('Finding Spot: ' + id);
        SpotModel.findOne({'_id' : id},'name loc', function (err, spot) {
            
            res.setHeader('Content-Type', 'application/json');
            if (err) {
                console.log(err);
                res.send(500);
            } 
            if(!spot){
                res.send(404);
            }
            return res.send(spot);
        });
    }
};*/