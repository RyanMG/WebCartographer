define(function(require) {

  var Mn = require('marionette');

  return Mn.ItemView.extend({

    template: "#toolbar_layout",

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
      var view = AppLayoutBabySitter.findByCustom("BabySitter:App:AppLayout:MapLayout");
      view.triggerMethod('rotateClockwise');
    },

    onRotateCounterBtnClick: function onRotateCounterBtnClick() {
      var view = AppLayoutBabySitter.findByCustom("BabySitter:App:AppLayout:MapLayout");
      view.triggerMethod('rotateCounterClockwise');
    },

    onNewTileBtnClick: function onNewTileBtnClick() {
      var tileType = this.ui.tilePicker.val();
      var view = AppLayoutBabySitter.findByCustom("BabySitter:App:AppLayout:MapLayout");
      var size = type.split('_')[2].split('x');
      var $img = $('<img>').addClass('tile').attr('src', './img/' + type + '.jpg');
      $img.css({
        'height' : size[0] * 64,
        'width' : size[1] * 64
      });
      view.$el.append($img);
      view.triggerMethod('initializeTile', $img);

    },

    onClearTilesBtnClick: function onClearTilesBtnClick() {
      var view = AppLayoutBabySitter.findByCustom("BabySitter:App:AppLayout:MapLayout");
      view.$el.empty();
    }

  });

});
