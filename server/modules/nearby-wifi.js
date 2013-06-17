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

	WifiHotSpotModel.find({},'name', function (err, wifiHotspots) {
 		if (!err) {
      		return res.send(wifiHotspots);
	    } else {
	    	return console.log(err);
	    }
	});
};