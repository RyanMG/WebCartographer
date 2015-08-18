define(function(require) {

  var Mn       = require('marionette')
    , Radio    = require('backbone.radio')
    , _        = require('underscore')
    , DragDrop = require('../../utilities/drag-drop');

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
      'touchstart @ui.icon': 'onTouchStart',
      'dragstart @ui.icon' : 'onDragStart',
      'dragend @ui.icon'   : 'onDragEnd'
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
      var xPos    = evt.originalEvent.offsetX
        , yPos    = evt.originalEvent.offsetY
        , imgSrc  = evt.target.src
        , textObj = JSON.stringify( { x: xPos, y: yPos, src: imgSrc } );

      evt.originalEvent.dataTransfer.setData( 'text', textObj );
      this.toggleOpen(false);
    },

    onTouchStart: function(evt) {
      this.toggleOpen(false);
    },

    onDragEnd: function(evt) {
      this.toggleOpen(true);
    }
  });

});
