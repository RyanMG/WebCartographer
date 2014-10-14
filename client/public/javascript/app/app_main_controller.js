define([
  "app"
], function(App) {

  "use strict";

  App.Controllers.Main = Backbone.Marionette.Controller.extend({

    initialize: function initialize(){},

    updateRoute: function updateRoute(route) {
      App.navigate(route, {trigger:true});
    },

    updateRouteSilent: function updateRouteSilent(route) {
      App.navigate(route, {trigger:false});
    }

  });

  var controller;

  App.addInitializer(function onAppInitialize() {
    controller = new App.Controllers.Main();
  });

  App.comply('App:MainController:updateRoute', function(route) {
    controller.updateRoute(route);
  });

  App.comply('App:MainController:updateRouteSilent', function(route) {
    controller.updateRouteSilent(route);
  });

  return App.Controllers.Main;
});