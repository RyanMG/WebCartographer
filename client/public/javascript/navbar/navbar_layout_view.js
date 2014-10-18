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
      tilePicker: '#tileTypePicker',
      clearMapBtn: '#clear-tiles'
    },

    hammerEvents: {
      "tap #rotate-clockwise": "onRotateClockwiseTap",
      "tap #rotate-counter-clockwise": "onRotateCounterBtnTap",
      "tap #new-tile": "onNewTileBtnTap",
      "tap #clear-tiles": "onClearTilesBtnTap"
    },

    hammerOptions: {
      tap: true,
      domEvents: true
    },

    onRotateClockwiseTap: function onRotateClockwiseTap() {
      App.command("Map:MainController:rotateSelectedTileClockwise");
    },

    onRotateCounterBtnTap: function onRotateCounterBtnTap() {
      App.command("Map:MainController:rotateSelectedTileCounterClockwise");
    },

    onNewTileBtnTap: function onNewTileBtnTap() {
      var tileType = this.ui.tilePicker.val();
      App.command("Map:MainController:addNewTile", tileType);
    },

    onClearTilesBtnTap: function onClearTilesBtnTap() {
      App.command("Map:MainController:clearMap");      
    },

    addToBabySitter: function addToBabySitter() {
      AppLayoutBabySitter.add(this, "BabySitter:App:AppLayout:NavbarLayout");
    }

  });

  return App.Navbar.Views.NavbarLayout;
});