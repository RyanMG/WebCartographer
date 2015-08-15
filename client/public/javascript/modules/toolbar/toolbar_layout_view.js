define(function(require) {

  var Mn    = require('marionette')
    , Radio = require('backbone.radio')
    , _     = require('underscore');

  return Mn.ItemView.extend({

    template: "#toolbar_layout",

    attributes: {
      'data-view-name' : 'toolbar_layout_view',
    },

    className: 'toolbar-region',

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

    onRotateClockwiseClick: _.throttle(function() {
      Radio.request('mapView', 'rotateClockwise');
    }, 400, {trailing: false}),

    onRotateCounterBtnClick: _.throttle(function() {
      Radio.request('mapView', 'rotateCounterClockwise');
    }, 400, {trailing: false}),

    onNewTileBtnClick: function() {
      var tileType = this.ui.tilePicker.val()
        , size     = tileType.split('_')[2].split('x')
        , $tileImg = $('<img>').addClass('tile').attr('src', './img/' + tileType + '.jpg');

      $tileImg.css({
        'height' : size[0] * 64,
        'width' : size[1] * 64
      });
      Radio.request('mapView', 'addNewTile', $tileImg);
    },

    onClearTilesBtnClick: function() {
      Radio.request('mapView', 'clearMap');
    }

  });

});
