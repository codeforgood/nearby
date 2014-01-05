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

var Spot = new Schema({
    name: String,
    loc: [Number],
    address: String,
    city: String,
    zip: String,
    phone: String,
    type: String,
    url: String,
    open: Boolean,
    spottype: String,
}, {collection: 'spots'});

var SpotModel = mongoose.model('Spot', Spot)

//clear the collection
SpotModel.remove({},function(err) { 
   console.log('Spots collection cleared') 
});

// load wifi hot spots
csv()
.from.path(__dirname+'/../data/wifi/csv/data.csv', 
	{ 
    delimiter: ',', 
		escape: '"',
		columns: true
	})
.transform(function(data){
    return data;
})
.on('record', function(row,index){
  
  var lat = row.SHAPE.split(',')[0];
  var lng = row.SHAPE.split(',')[1];

  new SpotModel({
  	name: row.NAME,
  	loc: [lng.slice(0,lng.length-1), lat.slice(1,lat.length)],
  	address: row.ADDRESS,
  	city: row.CITY,
  	zip: row.ZIP,
  	phone: row.PHONE,
  	type: row.TYPE,
  	url: row.URL,
    spottype: 'wifi'
  }).save();
})
.on('error', function(error){
  console.log(error.message);
  mongoose.connection.close()
})
.on('end', function(count){
  console.log('Number of wifi hot spots loaded: '+ count);
  //mongoose.connection.close()
});

// load restroom spots
csv()
.from.path(__dirname+'/../data/restroom/csv/data.csv', 
  { 
    delimiter: ',', 
    escape: '"',
    columns: true
  })
.transform(function(data){
    return data;
})
.on('record', function(row,index){

  new SpotModel({
    name: row.NAME,
    //loc: [lng.slice(0,lng.length-1), lat.slice(1,lat.length)],
    address: row.Location,
    city: row.Borough,
    //zip: row.ZIP,
    //phone: row.PHONE,
    spottype: 'restroom'
  }).save();
})
.on('error', function(error){
  console.log(error.message);
  mongoose.connection.close()
})
.on('end', function(count){
  console.log('Number of restroom spots loaded: '+ count);
  mongoose.connection.close()
});