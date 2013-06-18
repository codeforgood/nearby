var mongoose = require('mongoose'),
	Fs = require('fs');

var mongoUri =  'mongodb://localhost/nearby';

mongoose.connect(mongoUri);

var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function callback () {
   console.log("Successfully connected to MongoInstance");
});

var Schema = mongoose.Schema;

var WifiHotSpot = new Schema({
    name: String
}, {collection: 'wifihotspots'});

var WifiHotSpotModel = mongoose.model('WifiHotSpot', WifiHotSpot)

exports.getAllWifiHotSpots = function(req, res){

	var l_val = 10;

	if (typeof req.query.limit !== 'undefined' && req.query.limit !== null){
   		l_val = parseInt(req.query.limit)
	}
	
	var query = WifiHotSpotModel.find({}).select('name').limit(l_val);

	query.exec(function (err, wifiHotspots) {
 		if (!err) {
      		return res.send(wifiHotspots);
	    } else {
	    	return console.log(err);
	    }
	});
};

exports.getWifiHotSpot = function(req, res){

	WifiHotSpotModel.findOne({'_id' : req.params.id},'name', function (err, wifiHotspot) {
 		if (!err) {
      		return res.send(wifiHotspot);
	    } else {
	    	return console.log(err);
	    }
	});
};