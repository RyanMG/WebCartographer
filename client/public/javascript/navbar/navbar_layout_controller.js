define([
  "app"
  // , "babysitter/babysitter_app"
], function( App ) { //, BabySitter) {

  "use strict";

  var layout;
  var controller;

  App.Navbar.Controllers.Layout = Backbone.Marionette.Controller.extend({

    initialize: function initialize(){

    },

    // App layout will only be shown when the application first loads. It will never re-render.
    renderLayout: function renderLayout() {
      layout = new App.Navbar.Views.NavbarLayout(); 
      App.command("App:LayoutController:ShowInNavbarRegion", "NavbarLayout");
    }
  });

  controller = new App.Navbar.Controllers.Layout();

  App.comply("Navbar:LayoutController:RenderLayout", function(){
    controller.renderLayout();
  });

  return App.Navbar.Controllers.Layout;
});
