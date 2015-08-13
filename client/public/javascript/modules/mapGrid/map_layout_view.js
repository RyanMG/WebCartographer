define(function(require) {

  var Mn                 = require('marionette')
    , TileMoverBehavior  = require('./behaviors/tile_mover_behavior')
    , MapBuilderBehavior = require('./behaviors/build_map_behavior');

  return Mn.ItemView.extend({

    attributes: {
      'data-view-name' : 'map_layout_view',
    },

    className: "mapGrid",

    template: "#map_layout",

    behaviors: {
      'TileMoverBehavior'  : {},
      'MapBuilderBehavior' : {}
    },

    mergeOptions: [],

    ui: {},

    events: {
      "click": "onMapGridClick"
    },

    onMapGridClick: function onMapGridClick(evt) {
    },

    initialize: function initialize(options) {
      Mn.mergeOptions(this, options, this.mergeOptions);
    },

    onRender: function onRender() {
      this.triggerMethod('buildMap');
    }

  });

});
