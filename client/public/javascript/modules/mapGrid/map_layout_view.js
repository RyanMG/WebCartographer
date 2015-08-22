define(function(require) {

  var Mn             = require('marionette')
    , Radio          = require('backbone.radio')
    , TileCollection = require('modules/mapGrid/entities/tile_entity');

  return Mn.LayoutView.extend({

    attributes: {
      'data-view-name' : 'map_layout_view',
    },

    className: 'map-grid full-h-w',

    template: '#map_layout',

    mergeOptions: ['height', 'width', 'bg_texture'],

    regions: {
      grid  : '#grid-region',
      tiles : '#tiles-region'
    },

    ui: {
      wrapper  : '#map-wrapper',
      backdrop : '#map-backdrop',
    },

    events: {
      'dragover'  : 'preventDefaultEvent',
      'dragenter' : 'preventDefaultEvent',
    },

    initialize: function(options) {
      Mn.mergeOptions(this, options, this.mergeOptions);
      this.setupMapVariables();
      this.addListeners();
    },

    setupMapVariables: function() {
      this.tileHeight = this.height;
      this.tileWidth  = this.width;
      this.height *= 32;
      this.width *= 32;
    },

    preventDefaultEvent: function(evt) {
      evt.preventDefault();
      evt.stopPropagation();
    },

    addListeners: function() {
      Radio.reply('mapView', 'start:dragTile', this.addDropEvent, this);
      Radio.reply('mapView', 'end:dragTile', this.removeDropEvent, this);
    },

    onRender: function() {
      this.buildMap();

      var GridView = require('./views/map_grid_item_view')
        , TileView = require('./views/map_tiles_composite_view');

      this.getRegion('grid').show( new GridView({
        tileH  : this.tileHeight,
        tileW  : this.tileWidth,
        height : this.height,
        width  : this.width
      }) );
      this.getRegion('tiles').show( new TileView({
        collection: new TileCollection()
      }) );
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

    addDropEvent: function(options) {
      this.$el.on('drop', options, this.onTileDrop.bind(this) );
    },

    removeDropEvent: function() {
      this.$el.off('drop');
    },

    onTileDrop: function(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.getRegion('tiles').currentView.triggerMethod('tileDrop', evt);
    }

  });

});
