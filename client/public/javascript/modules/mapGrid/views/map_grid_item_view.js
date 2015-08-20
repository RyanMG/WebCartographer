define(function(require) {

  var Mn    = require('marionette')
    , Radio = require('backbone.radio');

  return Mn.ItemView.extend({

    attributes: {
      'data-view-name' : 'map_grid_item_view',
    },

    className: 'grid',

    template: _.template(""),

    mergeOptions: ['height', 'width', 'tileH', 'tileW'],

    initialize: function(options) {
      Mn.mergeOptions(this, options, this.mergeOptions);
      this.setupMapVariables();
      this.addListeners();
    },

    setupMapVariables: function() {
      this.gridOpacity = 0.8;
    },

    addListeners: function() {
      Radio.reply('gridView', 'updateGridOpacity', this.updateGridOpacity, this);
    },

    onRender: function() {
      this.addGrid();
    },

    addGrid: function() {
      this.$el.css({
        'height'  : this.height,
        'width'   : this.width,
        'opacity' : this.gridOpacity
      });

      for (var i = 1; i < this.tileH; i++) {
        $('<div class="grid-line grid-line-v">').css({ left: i * 32 }).appendTo(this.$el);
      }

      for (var i = 1; i < this.tileW; i++) {
        $('<div class="grid-line grid-line-h">').css({ top: i * 32 }).appendTo(this.$el);
      }
    },

    updateGridOpacity: function(newOpacity) {
      this.$el.css({
        'opacity': newOpacity
      })
    }

  });

});
