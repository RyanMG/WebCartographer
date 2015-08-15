define(function(require) {

  var Mn       = require('marionette')
    , Radio    = require('backbone.radio')
    , _        = require('underscore')
    , DragDrop = require('../../utilities/drag-drop')
;

  return Mn.ItemView.extend({

    template: "#tile_picker_layout",

    attributes: {
      'data-view-name' : 'tile_picker_layout_view',
    },

    className: 'tile-picker-window',

    ui: {
      icon: '.tile-icon'
    },

    events: {
      'dragstart @ui.icon': 'onDragStart',
      'dragend @ui.icon': 'onDragEnd'
    },

    initialize: function() {
      this.addListeners();
    },

    addListeners: function() {
      Radio.reply('tilePickerView', 'toggleOpen', this.toggleOpen, this);
    },

    toggleOpen: _.throttle(function(forceState) {
      this.$el.toggleClass('open', forceState);
    }, 550, {trailing: false}),

    onDragStart: function(evt) {
      new DragDrop(evt, evt.target, false);
      this.toggleOpen(false);
    },

    onDragEnd: function(evt) {
      this.toggleOpen(true);
    }

      // var tileType = this.ui.tilePicker.val()
      //   , size     = tileType.split('_')[2].split('x')
      //   , $tileImg = $('<img>').addClass('tile').attr('src', './img/' + tileType + '.jpg');

      // $tileImg.css({
      //   'height' : size[0] * 64,
      //   'width' : size[1] * 64
      // });
      // Radio.request('mapView', 'addNewTile', $tileImg);

  });

});
