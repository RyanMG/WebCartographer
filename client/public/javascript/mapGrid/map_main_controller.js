define([
  "app"
  ,"babysitter/app_layout_babysitter"
], function(App, AppLayoutBabySitter) {

  "use strict";

  var controller;

  App.Map.Controllers.Main = Backbone.Marionette.Controller.extend({

    initialize: function initialize(){},

    rotateSelectedTileClockwise: function rotateSelectedTileClockwise() {
      var view = AppLayoutBabySitter.findByCustom("BabySitter:App:AppLayout:MapLayout");
      view.triggerMethod('rotateClockwise');
    },

    rotateSelectedTileCounterClockwise: function rotateSelectedTileCounterClockwise() {
      var view = AppLayoutBabySitter.findByCustom("BabySitter:App:AppLayout:MapLayout");
      view.triggerMethod('rotateCounterClockwise');
    }

  });

  // ======================
  // Listeners
  // ======================

  App.addInitializer(function() {
    controller = new App.Map.Controllers.Main();
  });

  App.comply("Map:MainController:rotateSelectedTileClockwise", function() {
    controller.rotateSelectedTileClockwise();
  });

  App.command("Map:MainController:rotateSelectedTileCounterClockwise", function() {
    controller.rotateSelectedTileCounterClockwise();
  });

  return App.Map.Controllers.Main;
});