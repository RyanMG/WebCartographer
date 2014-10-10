require.config({

  findNestedDependencies: true,

  waitSeconds: 30,

  useStrict: true,

  "paths": {
    "underscore": "../vendor/underscore/underscore"
    , "backbone": "../vendor/backbone/backbone"
    , "backbone.wreqr": "../vendor/backbone/backbone.wreqr"
    , "backbone.radio": "../vendor/backbone/backbone.radio"
    , "backbone.stickit": "../vendor/backbone/backbone.stickit"
    , "backbone.babysitter": "../vendor/backbone/backbone.babysitter"
    , "marionette": "../vendor/marionette/backbone.marionette"
    , "fastclick": "../vendor/fastclick/fastclick"
    , "handlebars": "../vendor/handlebars/handlebars"
    , "jquery": "../vendor/jquery/jquery"
    , "modernizr": "../vendor/modernizr/modernizr"
    , "moment": "../vendor/moment/moment"
    , "hammer": "../vendor/plugins/hammer"
    , "text": "../vendor/requirejs/text"
    , "bacon": "../vendor/bacon/Bacon"
  },
  "shim": {
    "jquery": {
      "exports": ["jquery", "jQuery", "$"]
    },
    "handlebars": {
      "exports": "Handlebars"
    },
    "modernizr": {
      "exports": "Modernizr"
    },
    "moment": {
      "exports": "moment"
    },
    "stickit": ["backbone"],
  }
});

require(['vendor_files'], function() {

  // load our own code that's required before starting the App.
  require([
    "app"
    // "data_layer/data_app",
    // "babysitter/babysitter_app",
  ], function( App ) { //, Data, Babysitter) {

      'use strict';

      $.when(
        // Data.promise,
        // Babysitter.promise,
        App.promise
      )
        .done( function() {

          // Data.start();

          // var fetchingAppDependencies = App.request('App:fetchDataDependencies');
          // $.when(fetchingAppDependencies)
          //   .done(function() {
              App.start();
            // });
        });
    }
  );
});
