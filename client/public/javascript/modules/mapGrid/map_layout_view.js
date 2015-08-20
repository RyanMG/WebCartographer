define(function(require) {

  var Mn    = require('marionette')
    , Radio = require('backbone.radio');

  return Mn.LayoutView.extend({

    attributes: {
      'data-view-name' : 'map_layout_view',
    },

    className: "mapGrid",

    template: "#map_layout",

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
      this.height *= 32;
      this.width *= 32;
    },

    preventDefaultEvent: function(evt) {
      evt.preventDefault();
      evt.stopPropagation();
    },

    addListeners: function() {},

    onRender: function() {
      this.buildMap();

      var GridView = require('./views/map_grid_item_view');
      this.getRegion('grid').show( new GridView({
        height : this.height,
        width  : this.width
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
    }

  });

});
