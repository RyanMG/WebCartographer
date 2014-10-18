require.config({
  useStrict: true,
  findNestedDependencies: true,
  waitSeconds: 30,
  paths: {
    modernizr:"../vendor/modernizr/modernizr",
    underscore: "../vendor/underscore/underscore",
    marionette: "../vendor/marionette/lib/backbone.marionette",
    backbone: "../vendor/backbone/backbone",
    "backbone.hammer": "../vendor/backbone.hammer/backbone.hammer",
    "backbone.radio": "../vendor/backbone.radio/build/backbone.radio",
    "backbone.babysitter": "../vendor/backbone.babysitter/lib/backbone.babysitter",
    jquery: "../vendor/jquery/dist/jquery",
    jstorage: "../vendor/jstorage/jstorage",
    handlebars: "../vendor/handlebars/handlebars.amd",
    text: "../vendor/text/text",
    moment: "../vendor/momentjs/moment",
    json2: "../vendor/json2/json2",
    bacon: "../vendor/bacon/dist/Bacon",
    "bacon.model": "../vendor/bacon.model/dist/bacon.model",
    "bacon.jquery": "../vendor/bacon.jquery/dist/bacon.jquery",
    hammerjs: "../vendor/hammerjs/hammer",
    "jquery-hammerjs": "../vendor/jquery-hammerjs/jquery.hammer"
  },
  shim: {
    backbone: {
      deps: ["jquery", "underscore", "json2"],
      exports: "Backbone"
    },
    marionette: {
      deps: ["backbone", "backbone.hammer"],
      exports: "Marionette"
    },
    hammerjs: {
      exports: "Hammer"
    },
    "hammerjs.jquery": {
      deps: ["hammerjs"],
      exports: 'Hammer'
    },
    "jstorage": ["jquery"],
    "handlebars": {
      exports: "Handlebars"
    }
  }
});

require(['vendor_files'], function() {

  require([
    "app",
  ], function(App) {

      'use strict';

      $.when( App.promise )
        .done(function() {
            App.start();
        });
  });
});
