require([
  'require-config'
], function(config) {

  'use strict';

  require([
    'app',
    'extends/marionette.radio.extend',
    'extends/marionette.to-json.extend',
    'extends/marionette.merge-options.extend'
  ], function(app) {

    app.start();

    Backbone.history.start();

  });

});
