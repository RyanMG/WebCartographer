define([
  "marionette", // loads Backbone and jQuery
  "backbone.radio",
  "fastclick",
  "modernizr"
], function(Marionette, Radio, FastClick, Modernizr) {

    'use strict';

    FastClick.attach(document.body);

    _.extend( Marionette.Application.prototype,
        Radio.Requests
      , Radio.Commands
    );
  }
);