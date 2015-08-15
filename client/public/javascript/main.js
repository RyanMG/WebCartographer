require([
  'require-config'
], function(config) {

  'use strict';

  require([
    'app',
    'modernizr',
    'extends/all_extends'
  ], function(app) {

    app.start();

    Backbone.history.start();

  });

});
