var mongoose = require('mongoose'),
	Fs = require('fs'),
	csv = require('csv');

var mongoUri =  'mongodb://localhost/nearby?poolSize=1';

mongoose.connect(mongoUri);

var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function callback () {
   console.log("Successfully connected to MongoInstance");
});

var Schema = mongoose.Schema;

var WifiHotSpot = new Schema({
    name: String,
    loc: [Number],
    address: String,
    city: String,
    zip: String,
    phone: String,
    type: String,
    url: String
}, {collection: 'wifihotspots'});

var WifiHotSpotModel = mongoose.model('WifiHotSpots', WifiHotSpot)

//clear the collection
WifiHotSpotModel.remove({},function(err) { 
   console.log('wifiHotSpots collection cleared') 
});

csv()
.from.path(__dirname+'/../data/wifi/csv/data.csv', 
	{ 	delimiter: ',', 
		escape: '"',
		columns: true
	})
.transform(function(data){
    return data;
})
.on('record', function(row,index){
  
  var lat = row.SHAPE.split(',')[0];
  var lng = row.SHAPE.split(',')[1];

  new WifiHotSpotModel({
  	name: row.NAME,
  	loc: [lng.slice(0,lng.length-1), lat.slice(1,lat.length)],
  	address: row.ADDRESS,
  	city: row.CITY,
  	zip: row.ZIP,
  	phone: row.PHONE,
  	type: row.TYPE,
  	url: row.URL
  }).save();
})
.on('error', function(error){
  console.log(error.message);
  mongoose.connection.close()
})
.on('end', function(count){
  console.log('Number of lines: '+count);
  mongoose.connection.close()
});