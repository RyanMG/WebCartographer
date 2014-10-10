define([
  "app"
], function( App ) {

  "use strict";

  var layout;
  var controller;

  App.PictureTaker.Controllers.Layout = Backbone.Marionette.Controller.extend({

    initialize: function initialize(){

    },

    renderLayout: function renderLayout() {
      layout = new App.PictureTaker.Views.PictureTakerLayout(); 
      App.command("App:LayoutController:ShowInMainRegion", "PictureTakerLayout");
    }
  });

  controller = new App.PictureTaker.Controllers.Layout();

  App.comply("PictureTaker:LayoutController:RenderLayout", function(){
    controller.renderLayout();
  });

  return App.PictureTaker.Controllers.Layout;
});
