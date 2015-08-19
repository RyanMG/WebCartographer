define(function(require) {

  var Mn    = require('marionette')
    , Radio = require('backbone.radio')
    , _     = require('underscore');

  return Mn.ItemView.extend({

    template: "#toolbar_layout",

    attributes: {
      'data-view-name' : 'toolbar_layout_view',
    },

    className: 'toolbar',

    ui: {
      rotateClockwiseBtn: '#rotate-clockwise',
      rotateCounterBtn: '#rotate-counter-clockwise',
      newTileBtn: '#new-tile',
      clearMapBtn: '#clear-tiles',
      tileActionBtns: '.js-tile-action'
    },

    events: {
      "click @ui.rotateClockwiseBtn": "onRotateClockwiseClick",
      "click @ui.rotateCounterBtn": "onRotateCounterBtnClick",
      "click @ui.newTileBtn": "onNewTileBtnClick",
      "click @ui.clearMapBtn": "onClearTilesBtnClick"
    },

    initialize: function(options) {
      this.addListeners();
    },

    addListeners: function() {
      Radio.reply('toolbarView', 'tileSelected', this.enableTileActions, this);
      Radio.reply('toolbarView', 'tileDeselected', this.disableTileActions, this);
    },

    enableTileActions: function() {
      this.ui.tileActionBtns.removeClass('disabled');
    },

    disableTileActions: function() {
      this.ui.tileActionBtns.addClass('disabled');
    },

    onRotateClockwiseClick: _.throttle(function() {
      Radio.request('mapView', 'rotateClockwise');
    }, 600, {trailing: false}),

    onRotateCounterBtnClick: _.throttle(function() {
      Radio.request('mapView', 'rotateCounterClockwise');
    }, 600, {trailing: false}),

    onNewTileBtnClick: function() {
      Radio.request('tilePickerView', 'toggleOpen');
    },

    onClearTilesBtnClick: function() {
      Radio.request('mapView', 'clearMap');
    }

  });

});
