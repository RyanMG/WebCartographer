define(function(require) {

  var Mn                 = require('marionette')
    , Radio              = require('backbone.radio')
    , TileCollection     = require('./entities/tile_entity')
    , TileMoverBehavior  = require('./behaviors/tile_mover_behavior');

  return Mn.ItemView.extend({

    attributes: {
      'data-view-name' : 'map_layout_view',
    },

    className: "mapGrid",

    template: "#map_layout",

    behaviors: {
      'TileMoverBehavior': {
        behaviorClass: TileMoverBehavior
      }
    },

    mergeOptions: ['height', 'width', 'bg_texture'],

    ui: {
      wrapper  : '#map-wrapper',
      backdrop : '#map-backdrop',
      grid     : '#grid',
      tiles    : '#tiles',
      tile     : '.tile'
    },

    events: {
      'dragover'     : 'preventDefaultEvent',
      'dragenter'    : 'preventDefaultEvent',
      'drop'         : 'onTileDrop',
      'tap @ui.tile' : 'onTileTap'
    },

    initialize: function(options) {
      this.collection = new TileCollection();
      Mn.mergeOptions(this, options, this.mergeOptions);
      this.setupMapVariables();
      this.addListeners();
    },

    setupMapVariables: function() {
      this.numHeightTiles = this.height;
      this.numWidthTiles  = this.width;
      this.height *= 32;
      this.width *= 32;
    },

    preventDefaultEvent: function(evt) {
      evt.preventDefault();
      evt.stopPropagation();
    },

    addListeners: function() {
      Radio.reply('mapView', 'rotateClockwise', this.rotateClockwise, this);
      Radio.reply('mapView', 'rotateCounterClockwise', this.rotateCounterClockwise, this);
      Radio.reply('mapView', 'addNewTile', this.addNewTile, this);
      Radio.reply('mapView', 'clearMap', this.clearMap, this);
    },

    onRender: function() {
      this.buildMap();
      this.addGrid();
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
        'height': this.height,
        'width': this.width
      });

      for (var i = 1; i < this.numHeightTiles; i++) {
        $('<div class="grid-line grid-line-v">').css({ left: i * 32 }).appendTo(this.ui.grid);
      }

      for (var i = 1; i < this.numWidthTiles; i++) {
        $('<div class="grid-line grid-line-h">').css({ top: i * 32 }).appendTo(this.ui.grid);
      }
    },

    onTileDrop: function(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      if (!evt.target.id || evt.target.id !== 'tiles') return false;

      var tileData = JSON.parse( evt.originalEvent.dataTransfer.getData( 'text' ) )
        , newTile;

      dropData = {
        mapX : evt.originalEvent.offsetX || 0,
        mapY : evt.originalEvent.offsetY || 0
      };

      newTile  = this.collection.add(tileData, dropData);
      this.ui.tiles.append(newTile.$el);
    },

    onTileTap: function(evt) {
      debugger;
    },

    rotateClockwise: function() {
      this.triggerMethod('rotateClockwise')
    },

    rotateCounterClockwise: function() {
      this.triggerMethod('rotateCounterClockwise')
    },

    clearMap: function() {
      this.triggerMethod('clearCurrentElement');
      this.ui.tiles.empty();
    }

  });

});
