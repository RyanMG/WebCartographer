define(function(require) {

  var Mn                 = require('marionette')
    , Radio              = require('backbone.radio')
    , TileItemView       = require('./tile_item_view');

  return Mn.CompositeView.extend({

    attributes: {
      'data-view-name' : 'map_composite_view',
    },

    className: "mapGrid",

    template: "#map_layout",

    childView : TileItemView,

    childViewContainer: '@ui.tiles',

    mergeOptions: ['height', 'width', 'bg_texture'],

    ui: {
      wrapper  : '#map-wrapper',
      backdrop : '#map-backdrop',
      grid     : '#grid',
      tiles    : '#tiles'
    },

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
      this.numHeightTiles = this.height;
      this.numWidthTiles  = this.width;
      this.height *= 32;
      this.width *= 32;
      this.gridOpacity = 0.8;
      this.selectedChild = null;
    },

    preventDefaultEvent: function(evt) {
      evt.preventDefault();
      evt.stopPropagation();
    },

    addListeners: function() {
      Radio.reply('mapView', 'rotateClockwise', this.rotateClockwise, this);
      Radio.reply('mapView', 'rotateCounterClockwise', this.rotateCounterClockwise, this);
      Radio.reply('mapView', 'clearMap', this.clearMap, this);
      Radio.reply('mapView', 'updateGridOpacity', this.updateGridOpacity, this);

      Radio.reply('mapView', 'start:dragTile', this.addDropEvent, this);
      Radio.reply('mapView', 'end:dragTile', this.removeDropEvent, this);
    },

    onRender: function() {
      this.buildMap();
      this.addGrid();
    },

    addDropEvent: function(options) {
      this.$el.on('drop', options, this.onTileDrop.bind(this) );
    },

    removeDropEvent: function() {
      this.$el.off('drop');
    },

    buildMap: function() {
      var texture = 'url(img/' + this.bg_texture + '_floor_bg.jpg)'
        , top     = 0 - (this.height / 2)
        , left    = 0 - (this.width / 2);

      this.ui.wrapper.css({
        'height': this.height,
        'width': this.width,
        'margin-top': top,
        'margin-left': left
      });

      this.ui.backdrop.css({
        'background-image': texture
      });
    },

    addGrid: function() {
      this.ui.grid.css({
        'height'  : this.height,
        'width'   : this.width,
        'opacity' : this.gridOpacity
      });

      for (var i = 1; i < this.numHeightTiles; i++) {
        $('<div class="grid-line grid-line-v">').css({ left: i * 32 }).appendTo(this.ui.grid);
      }

      for (var i = 1; i < this.numWidthTiles; i++) {
        $('<div class="grid-line grid-line-h">').css({ top: i * 32 }).appendTo(this.ui.grid);
      }
    },

    updateGridOpacity: function(newOpacity) {
      this.ui.grid.css({
        'opacity': newOpacity
      })
    },

    onTileDrop: function(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      if (!evt.target.id || evt.target.id !== 'tiles') return false;

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
      this.ui.tiles.empty();
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
