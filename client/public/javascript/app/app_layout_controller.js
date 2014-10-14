define([
  "app"
  ,"babysitter/app_layout_babysitter"
], function( App, AppLayoutBabySitter) {

  "use strict";

  var controller;
  var layout;

  App.Controllers.Layout = Backbone.Marionette.Controller.extend({

    initialize: function initialize(){

      App.addRegions({
        layoutRegion: "#app-layout-region" 
      });
    },

    renderLayout: function renderLayout() {
      layout = new App.Views.AppLayout();
      App.layoutRegion.show(layout);
    },

    showInActionbarRegion: function showInActionbarRegion() {
      var view = AppLayoutBabySitter.findByCustom("BabySitter:App:AppLayout:NavbarLayout");
      layout.actionbarRegion.show(view);
    },

    showInMapRegion: function showInMapRegion() {
      var view = AppLayoutBabySitter.findByCustom("BabySitter:App:AppLayout:MapLayout");
      layout.mapRegion.show(view);
    }
  });

  App.addInitializer(function() {
    controller = new App.Controllers.Layout();
  });

  App.complyOnce("App:LayoutController:RenderLayout", function() {
    controller.renderLayout();
  });

  App.comply("App:LayoutController:ShowInActionbarRegion", function() {
    controller.showInActionbarRegion();
  });

  App.comply("App:LayoutController:ShowInMapRegion", function() {
    controller.showInMapRegion();
  });

  return App.Controllers.Layout;
});
