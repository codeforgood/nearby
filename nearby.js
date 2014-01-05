var  express = require('express')
	   wifi = require('./server/modules/spots');

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
  res.setHeader('Content-Type', 'application/json');
	res.send(200)
});
app.get('/api/nearby/spots', wifi.getAllSpots);
app.get('/api/nearby/spot/:id', wifi.getSpot);
/******Routes*******/