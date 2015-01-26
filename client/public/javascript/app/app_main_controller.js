define([
  "app"
], function(App) {

  App.Controllers.Main = Backbone.Marionette.Controller.extend({

    initialize: function initialize(){},

    updateRoute: function updateRoute(route) {
      App.navigate(route, {trigger:true});
    },

    updateRouteSilent: function updateRouteSilent(route) {
      App.navigate(route, {trigger:false});
    },

    buildNewMap: function buildNewMap(newMapOptions) {
      App.command("Toolbar:LayoutController:RenderLayout");
      App.command("Map:LayoutController:RenderLayout", newMapOptions);
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

  App.comply('App:MainController:buildNewMap', function(newMapOptions) {
    controller.buildNewMap(newMapOptions);
  });

  return App.Controllers.Main;
});