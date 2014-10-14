define([
  "app"
], function( App ) {

  "use strict";

  var controller;

  App.Navbar.Controllers.Layout = Backbone.Marionette.Controller.extend({

    initialize: function initialize() {},

    // App layout will only be shown when the application first loads. It will never re-render.
    renderLayout: function renderLayout() {
      var layout = new App.Navbar.Views.NavbarLayout(); 
      App.command("App:LayoutController:ShowInActionbarRegion");
    }
  });

  App.addInitializer(function() {
    controller = new App.Navbar.Controllers.Layout();
  });

  App.complyOnce("Navbar:LayoutController:RenderLayout", function(){
    controller.renderLayout();
  });

  return App.Navbar.Controllers.Layout;
});
