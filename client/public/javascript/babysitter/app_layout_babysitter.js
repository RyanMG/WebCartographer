define([
  "app"
], function(App) {

  App.BabySitter = {};

  App.BabySitter.AppLayouts = new Backbone.ChildViewContainer();

  return App.BabySitter.AppLayouts;
});