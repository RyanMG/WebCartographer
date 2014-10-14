define([
  "app"
], function( App ) {

  "use strict";

  var controller;

  App.Map.Controllers.Layout = Backbone.Marionette.Controller.extend({

    initialize: function initialize() {},

    renderLayout: function renderLayout() {
      var layout = new App.Map.Views.MapLayout(); 
      App.command("App:LayoutController:ShowInMapRegion");
    }
  });

  App.addInitializer(function() {
    controller = new App.Map.Controllers.Layout();
  });

  App.comply("Map:LayoutController:RenderLayout", function(){
    controller.renderLayout();
  });

  return App.Map.Controllers.Layout;
});
