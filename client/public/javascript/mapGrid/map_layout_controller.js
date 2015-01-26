define([
  "app"
], function( App ) {

  var controller;

  App.Map.Controllers.Layout = Backbone.Marionette.Controller.extend({

    initialize: function initialize() {},

    renderLayout: function renderLayout(mapOptions) {
      var layout = new App.Map.Views.MapLayout(mapOptions);
      App.command("App:LayoutController:ShowInMapRegion");
    }
  });

  App.addInitializer(function() {
    controller = new App.Map.Controllers.Layout();
  });

  App.comply("Map:LayoutController:RenderLayout", function(mapOptions){
    controller.renderLayout(mapOptions);
  });

  return App.Map.Controllers.Layout;
});
