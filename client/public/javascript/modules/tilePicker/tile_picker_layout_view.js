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
      'dragend @ui.icon'  : 'onDragEnd'
    },

    preventDefaultAction: function(evt) {
      evt.preventDefault();
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
  });

});
