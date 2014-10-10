define([
  "app"
  , "babysitter/app_layout_babysitter"
  // , "helpers/helper_app"
], function( App, AppLayoutBabySitter) { //, Helper) {

  "use strict";

  var layout;
  var controller;

  App.Controllers.Layout = Backbone.Marionette.Controller.extend({

    initialize: function initialize(){

      App.addRegions({
        layoutRegion: "#app-layout-region" 
      });
    },

    // App layout will only be shown when the application first loads. It will never re-render.
    renderLayout: function renderLayout() {
      layout = new App.Views.AppLayout();
      App.layoutRegion.show(layout);
    }
  });

  controller = new App.Controllers.Layout();

  App.complyOnce("App:LayoutController:RenderLayout", function(){
    controller.renderLayout();
  });

  return App.Controllers.Layout;
});
