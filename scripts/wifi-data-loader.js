var mongoose = require('mongoose'),
	Fs = require('fs'),
	csv = require('csv');

var mongoUri =  'mongodb://localhost/nearby-test?poolSize=1';

mongoose.connect(mongoUri);

var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function callback () {
   console.log("Successfully connected to MongoInstance");
});

var Schema = mongoose.Schema;

var WifiHotSpot = new Schema({
    name: String,
    address: String
}, {collection: 'wifihotspots'});

var WifiHotSpotModel = mongoose.model('WifiHotSpots', WifiHotSpot)

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
  //console.log('#'+index+' '+ row.NAME + ',' + row.ADDRESS);
  new WifiHotSpotModel({
  	name: row.NAME,
  	address: row.ADDRESS
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