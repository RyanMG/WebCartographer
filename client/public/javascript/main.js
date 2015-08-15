require([
  'require-config'
], function(config) {

  'use strict';

  require([
    'app',
    'extends/all_extends'
  ], function(app) {

    app.start();

    Backbone.history.start();

  });

});
