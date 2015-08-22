require([
  'require-config'
], function(config) {

  'use strict';

  require([
    'app',
    'modernizr',
    'extends/all_extends'
  ], function(app) {

    var Backbone = require('backbone');
    app.start();
    Backbone.history.start();

  });

});
