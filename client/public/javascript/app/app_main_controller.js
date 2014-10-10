define([
  "app"
  // ,"helpers/helper_app"
  // ,"data_layer/data_app"
], function(App) { //, Helper, Data) {

  "use strict";

  App.Controllers.Main = Backbone.Marionette.Controller.extend({

    initialize: function initialize(){},

    // showNotFound: function showNotFound(){
    //   App.trigger("log", "App:Controller:showNotFound");
    //   var layout = new App.Views.AppNotFoundLayout();
    //   this.showInMain(layout);
    // },

    updateRoute: function updateRoute(route) {
      App.navigate(route, {trigger:true});
    },

    updateRouteSilent: function updateRouteSilent(route) {
      App.navigate(route, {trigger:false});
    }

  });

  var controller;

  App.on("route:unknown", function(){
    // TODO: Create a not found page
    // controller.showNotFound();
  });

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