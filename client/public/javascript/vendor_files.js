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

    _.extend( Marionette.Application.prototype,
      Radio.Requests
      ,Radio.Commands
    );
});
