define([
  "marionette", // loads Backbone and jQuery
  "backbone.radio",
  "modernizr",
  "handlebars",
  "jstorage",
  "moment",
  "bacon",
  "bacon.model",
  "bacon.jquery"
], function( Marionette, Radio, Modernizr, Handlebars, jstorage, Moment, Bacon ) {

    'use strict';

    _.extend( Marionette.Application.prototype,
      Radio.Requests
      ,Radio.Commands
    );
});
