define([
  "app"
  , "babysitter/app_layout_babysitter"
],function(App, AppLayoutBabySitter){

  App.Toolbar.Views.ToolbarLayout = Backbone.Marionette.ItemView.extend({

    template: "#toolbar_layout",

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

    events: {
      "click @ui.rotateClockwiseBtn": "onRotateClockwiseClick",
      "click @ui.rotateCounterBtn": "onRotateCounterBtnClick",
      "click @ui.newTileBtn": "onNewTileBtnClick",
      "click @ui.clearMapBtn": "onClearTilesBtnClick"
    },

    onRotateClockwiseClick: function onRotateClockwiseClick() {
      App.command("Map:MainController:rotateSelectedTileClockwise");
    },

    onRotateCounterBtnClick: function onRotateCounterBtnClick() {
      App.command("Map:MainController:rotateSelectedTileCounterClockwise");
    },

    onNewTileBtnClick: function onNewTileBtnClick() {
      var tileType = this.ui.tilePicker.val();
      App.command("Map:MainController:addNewTile", tileType);
    },

    onClearTilesBtnClick: function onClearTilesBtnClick() {
      App.command("Map:MainController:clearMap");      
    },

    addToBabySitter: function addToBabySitter() {
      AppLayoutBabySitter.add(this, "BabySitter:App:AppLayout:ToolbarLayout");
    }

  });

  return App.Toolbar.Views.ToolbarLayout;
});