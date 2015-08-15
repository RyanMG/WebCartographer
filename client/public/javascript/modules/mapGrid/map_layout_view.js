define(function(require) {

  var Mn                 = require('marionette')
    , Radio              = require('backbone.radio')
    , TileMoverBehavior  = require('./behaviors/tile_mover_behavior')
    , MapBuilderBehavior = require('./behaviors/build_map_behavior');

  return Mn.ItemView.extend({

    attributes: {
      'data-view-name' : 'map_layout_view',
    },

    className: "mapGrid",

    template: "#map_layout",

    behaviors: {
      'TileMoverBehavior'  : {
        behaviorClass: TileMoverBehavior
      },
      'MapBuilderBehavior' : {
        behaviorClass: MapBuilderBehavior
      }
    },

    mergeOptions: ['height', 'width', 'bg_texture'],

    ui: {
      grid  : '#grid',
      tiles : '#tiles'
    },

    events: {
      "click": "onMapGridClick"
    },

    onMapGridClick: function(evt) {
    },

    initialize: function(options) {
      Mn.mergeOptions(this, options, this.mergeOptions);
      Radio.reply('mapView', 'rotateClockwise', this.rotateClockwise, this);
      Radio.reply('mapView', 'rotateCounterClockwise', this.rotateCounterClockwise, this);
      Radio.reply('mapView', 'addNewTile', this.addNewTile, this);
      Radio.reply('mapView', 'clearMap', this.clearMap, this);
    },

    onRender: function() {
      this.triggerMethod('buildMap');
    },

    addNewTile: function($tileImage) {
      this.ui.tiles.append($tileImage);
      this.triggerMethod('initializeTile', $tileImage);
    },

    rotateClockwise: function() {
      this.triggerMethod('rotateClockwise')
    },

    rotateCounterClockwise: function() {
      this.triggerMethod('rotateCounterClockwise')
    },

    clearMap: function() {
      this.$el.empty();
    }

  });

});
