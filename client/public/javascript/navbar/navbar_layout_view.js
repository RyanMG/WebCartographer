define([
  "app"
  , "babysitter/app_layout_babysitter"
],function(App, AppLayoutBabySitter){

  App.Navbar.Views.NavbarLayout = Backbone.Marionette.ItemView.extend({

    template: "#navbar_layout",

    initialize: function initialize() {
      this.addToBabySitter();
    },

    ui: {
      rotateClockwiseBtn: '#rotate-clockwise',
      rotateCounterBtn: '#rotate-counter-clockwise',
      newTileBtn: '#new-tile',
      tilePicker: '#tileTypePicker'
    },

    events: {
      "tap @ui.rotateClockwiseBtn": "onRotateClockwiseTap",
      "tap @ui.rotateCounterBtn": "onRotateCounterBtnTap",
      "tap @ui.newTileBtn": "onNewTileBtnTap",
    },

    onRotateClockwiseTap: function onRotateClockwiseTap() {
      App.command("Map:MainController:rotateSelectedTileClockwise");
    },

    onRotateCounterBtnTap: function onRotateCounterBtnTap() {
      App.command("Map:MainController:rotateSelectedTileCounterClockwise");
    },

    onNewTileBtnTap: function onNewTileBtnTap() {
      App.command("Map:MainController:rotateSelectedTileClockwise");
    },

    addToBabySitter: function addToBabySitter() {
      AppLayoutBabySitter.add(this, "BabySitter:App:AppLayout:NavbarLayout");
    }

  });

  return App.Navbar.Views.NavbarLayout;
});