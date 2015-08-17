(function(require) {

  'use strict';

  // Store require configuration as an object so that it can be exported
  // if this file is required from within the Node.js developer tools
  var requireConfig = {};

  requireConfig.paths = {
    modernizr: "../vendor/modernizr/modernizr",
    underscore: "../vendor/underscore/underscore",
    marionette: "../vendor/marionette/lib/backbone.marionette",
    backbone: "../vendor/backbone/backbone",
    "backbone.radio": "../vendor/backbone.radio/build/backbone.radio",
    "backbone.babysitter": "../vendor/backbone.babysitter/lib/backbone.babysitter",
    jquery: "../vendor/jquery/dist/jquery",
    handlebars: "../vendor/handlebars/handlebars.amd"
  };

  requireConfig.shim = {
    backbone: {
      deps: ["jquery", "underscore"],
      exports: "Backbone"
    },
    marionette: {
      deps: ["backbone"],
      exports: "Marionette"
    },
    "handlebars": {
      exports: "Handlebars"
    }
  };

  // Detect environment by checking for the presence of the "module" global:
  if (typeof module !== 'undefined' && module.exports) {
    // We are in Node: export the configuration objects for use elsewhere
    // (this avoids duplication of the entire Require paths and shim lists)
    module.exports = requireConfig;
    // Exit out
    return;
  }

  // We are in the browser: continue to configure Require.js and initialize app
  require.config({
    useStrict: true,
    findNestedDependencies: true,
    // Cache-bust
    urlArgs: "bust=" + (new Date()).getTime(),
    waitSeconds: 30,
    paths: requireConfig.paths,
    shim: requireConfig.shim
  });

})(require);
