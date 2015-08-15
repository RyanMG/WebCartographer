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
      Radio.request('tilePickerView', 'toggleOpen');
    },

    onClearTilesBtnClick: function() {
      Radio.request('mapView', 'clearMap');
    }

  });

});
