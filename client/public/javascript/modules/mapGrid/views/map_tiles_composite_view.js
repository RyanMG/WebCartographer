define(function(require) {

  var Mn           = require('marionette')
    , Radio        = require('backbone.radio')
    , TileItemView = require('./tile_item_view');

  return Mn.CompositeView.extend({

    attributes: {
      'data-view-name' : 'map_composite_view',
    },

    className: 'tiles full-h-w edit-mode',

    template: _.template(''),

    childView : TileItemView,

    childViewContainer: this.$el,

    mergeOptions: [],

    events: {
      'dragover'  : 'preventDefaultEvent',
      'dragenter' : 'preventDefaultEvent',
      'click'     : 'onMapClick'
    },

    childEvents: {
      'child:selected' : 'swapSelectedChild'
    },

    initialize: function(options) {
      Mn.mergeOptions(this, options, this.mergeOptions);
      this.setupMapVariables();
      this.addListeners();
    },

    setupMapVariables: function() {
      this.selectedChild = null;
    },

    preventDefaultEvent: function(evt) {
      evt.preventDefault();
      evt.stopPropagation();
    },

    addListeners: function() {
      Radio.reply('tileView', 'rotateClockwise', this.rotateClockwise, this);
      Radio.reply('tileView', 'rotateCounterClockwise', this.rotateCounterClockwise, this);
      Radio.reply('tileView', 'clearMap', this.clearMap, this);
    },

    onTileDrop: function(evt) {
      var tileData = evt.data.tileData
        , dropData = {
            mapX : evt.originalEvent.offsetX || 0,
            mapY : evt.originalEvent.offsetY || 0
          };

      if (evt.data.isNew) {
        this.collection.add(tileData, dropData);
      } else {
        this.selectedChild.move(tileData, dropData);
      }
    },

    onMapClick: function(evt) {
      // TODO: Deselect when no tile is clicked
      // Radio.request('toolbarView', 'tileDeselected');
    },

    swapSelectedChild: function(childView) {
      if (this.selectedChild) {
        this.selectedChild.deselect();
      } else {
        Radio.request('toolbarView', 'tileSelected');
      }

      this.selectedChild = childView;
    },

    clearMap: function() {
      this.triggerMethod('clearCurrentElement');
      this.$el.empty();
      this.selectedChild = null;
    },

    rotateClockwise: function() {
       if (this.selectedChild) {
        this.selectedChild.rotateClockwise();
      }
    },

    rotateCounterClockwise: function() {
       if (this.selectedChild) {
        this.selectedChild.rotateCounterClockwise();
      }
    }

  });

});
