define([
  "app"
  ,"babysitter/app_layout_babysitter"
], function(App, AppLayoutBabySitter) {

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
    },

    addNewTile: function addNewTile(type) {
      var view = AppLayoutBabySitter.findByCustom("BabySitter:App:AppLayout:MapLayout");
      var size = type.split('_')[2].split('x');
      var $img = $('<img>').addClass('tile').attr('src', './img/' + type + '.jpg');
      $img.css({
        'height' : size[0] * 64,
        'width' : size[1] * 64
      });
      view.$el.append($img);
      view.triggerMethod('initializeTile', $img);
    },

    clearMap: function clearMap() {
      var view = AppLayoutBabySitter.findByCustom("BabySitter:App:AppLayout:MapLayout");
      view.$el.empty();
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

  App.comply("Map:MainController:rotateSelectedTileCounterClockwise", function() {
    controller.rotateSelectedTileCounterClockwise();
  });

  App.comply("Map:MainController:addNewTile", function(tileType) {
    controller.addNewTile(tileType);
  });

  App.comply("Map:MainController:clearMap", function() {
    controller.clearMap();
  }); 

  return App.Map.Controllers.Main;
});