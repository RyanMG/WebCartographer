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

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// ROUTES FOR OUR API
// =============================================================================
// router = express.Router();

// router.use(function(req, res, next) {
//   // Can use this to authenticate
//   next();
// });

// router.route('/tiles')
//   .get(function(req, res) {
//     Tile.findAll()
//       .done(function(model) {
//         res.send(model);
//       });

//   });

// app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
