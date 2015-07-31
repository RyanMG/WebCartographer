define([
  "marionette", // loads Backbone and jQuery
  "backbone.radio",
  "modernizr",
  "handlebars",
  "jstorage",
  "moment"
], function( Marionette, Radio, Modernizr, Handlebars, jstorage, Moment ) {

    _.extend( Marionette.Application.prototype,
      Radio.Requests
      ,Radio.Commands
    );
});
