define(function(require) {

  var Backbone      = require('backbone')
    , Marionette    = require('marionette')
    , AppRouter     = require('app/app_router')
    , globalChannel = Backbone.Radio.channel('global')
    , App           = new Backbone.Marionette.Application();

  App.start();
  // Render master Layout for entire application.
  globalChannel.request("App:LayoutController:RenderLayout");

  Backbone.history.start();

  globalChannel.request("Navbar:DialogController:showNewMapDialog");

});
