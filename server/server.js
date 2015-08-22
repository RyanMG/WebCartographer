var express    = require('express')
  , app        = express()
  , bodyParser = require('body-parser')
  , path       = require('path')
  , port       = process.env.PORT || 8080
  , router;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Sequilize
// =============================================================================
var Tile = require('./models/tile');

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var sendResponse = function(res, object, statusCode, contentType) {
  statusCode = statusCode || 200;
  contentType = contentType || 'application/json';
  object = (typeof object === 'string') ? object : JSON.stringify(object);
  headers['content-type'] = contentType;
  res.writeHead(statusCode, headers);
  res.end(object);
};

// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname + '/index.html'));
// });

// ROUTES FOR OUR API
// =============================================================================
router = express.Router();

router.use(function(req, res, next) {
  // Can use this to authenticate
  next();
});

router.route('/tiles')
  .get(function(req, res) {
    Tile.findAll()
      .done(function(model) {
        sendResponse(res, model, 201);
      });

  });

app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
