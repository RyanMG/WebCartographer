define([
  "app"
], function( App ) {

  var controller;

  App.Toolbar.Controllers.Layout = Backbone.Marionette.Controller.extend({

    initialize: function initialize() {},

    // App layout will only be shown when the application first loads. It will never re-render.
    renderLayout: function renderLayout() {
      var layout = new App.Toolbar.Views.ToolbarLayout(); 
      App.command("App:LayoutController:ShowInToolbarRegion");
    }
  });

  App.addInitializer(function() {
    controller = new App.Toolbar.Controllers.Layout();
  });

  App.complyOnce("Toolbar:LayoutController:RenderLayout", function(){
    controller.renderLayout();
  });

  return App.Toolbar.Controllers.Layout;
});
