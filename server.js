var  express = require('express')
	   wifi = require('./server/modules/nearby-wifi.js');

var app = express();

app.set('title', 'Nearby');

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.use(app.router);
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

var port = process.env.PORT || 5002;

app.listen(port, function() {
  console.log("Nearby Server Listening on " + port);
  console.log(app.routes)
});

/******Routes*******/
app.get('/api/nearby', function(req, res) {
	res.send('Hi from Nearby')
});
app.get('/api/nearby/wifi', wifi.getAllWifiHotSpots);
/******Routes*******/