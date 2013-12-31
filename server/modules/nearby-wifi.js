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
    name: String,
    loc: {type: [Number], index: '2d'},
    address: String,
    city: String,
    zip: String,
    phone: String,
    type: String,
    url: String
}, {collection: 'wifihotspots'});

var WifiHotSpotModel = mongoose.model('WifiHotSpot', WifiHotSpot)

exports.getAllWifiHotSpots = function(req, res){

	var l_val = 10;
	var lat;
	var lng;

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
	console.log('Finding WifiHotpSpots');
	var query = WifiHotSpotModel.find({})
					.select('name address city zip phone url type loc');

	//add the geospatial query criteria if lat and lng are available
	if(typeof lng !== 'undefined' && typeof lat !== 'undefined'){
		console.log('Around, lng: ' + lng + ', lat: ' + lat);
		query.where('loc').near(lng,lat);
	}
	//set the result limit
	console.log('limit: ' + l_val);
	query.limit(l_val);
	
	query.exec(function (err, wifiHotspots) {

 		res.setHeader('Content-Type', 'application/json');
 		if (err) {
			console.log(err);
			res.send(500);
	    } 
	    return res.send(wifiHotspots);
	});
};

exports.getWifiHotSpot = function(req, res){

	var id;
	if(typeof req.params.id !== 'undefined' && req.params.id){
		id = req.params.id
	}
	console.log('Finding WifiHotSpot: ' + id);
	WifiHotSpotModel.findOne({'_id' : id},'name loc', function (err, wifiHotspot) {
 		
 		res.setHeader('Content-Type', 'application/json');
 		if (err) {
			console.log(err);
			res.send(500);
	    } 
	    if(!wifiHotspot){
	    	res.send(404);
	    }
	    return res.send(wifiHotspot);
	});
};