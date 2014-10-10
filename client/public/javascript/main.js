require.config({

  findNestedDependencies: true,

  waitSeconds: 30,

  useStrict: true,

  "paths": {
    "underscore": "../vendor/underscore/underscore"
    , "backbone": "../vendor/backbone/backbone"
    , "backbone.wreqr": "../vendor/backbone.wreqr/lib/backbone.wreqr"
    , "backbone.radio": "../vendor/backbone.radio/build/backbone.radio"
    , "backbone.stickit": "../vendor/backbone/backbone.stickit"
    , "backbone.babysitter": "../vendor/backbone.babysitter/lib/backbone.babysitter"
    , "marionette": "../vendor/marionette/lib/backbone.marionette"
    , "fastclick": "../vendor/fastclick/lib/fastclick"
    , "handlebars": "../vendor/handlebars/handlebars"
    , "jquery": "../vendor/jquery/dist/jquery"
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

  require([
    "app"
  ], function( App ) {

      'use strict';

      $.when(App.promise)
        .done( function() {
          App.start();
        });
  });
});
