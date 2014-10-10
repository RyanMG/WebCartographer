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
    },

    showInNavbarRegion: function showInNavbarRegion(viewName) {
      var viewToShow = AppLayoutBabySitter.findByCustom("BabySitter:App:AppLayout:" + viewName);
      layout.navbarRegion.show(viewToShow);
    },

    showInMainRegion: function showInMainRegion(viewName) {
      var viewToShow = AppLayoutBabySitter.findByCustom("BabySitter:App:AppLayout:" + viewName);
      layout.mainRegion.show(viewToShow);
    }
  });

  controller = new App.Controllers.Layout();

  App.complyOnce("App:LayoutController:RenderLayout", function(){
    controller.renderLayout();
  });

  App.comply("App:LayoutController:ShowInNavbarRegion", function(viewName){
    controller.showInNavbarRegion(viewName);
  });

  App.comply("App:LayoutController:ShowInMainRegion", function(viewName){
    controller.showInMainRegion(viewName);
  });

  return App.Controllers.Layout;
});
