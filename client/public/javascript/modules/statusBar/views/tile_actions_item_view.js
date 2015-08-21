define(function(require) {

  var Mn     = require('marionette')
    , Radio  = require('backbone.radio');

  return Mn.ItemView.extend({

    attributes: {
      'data-view-name' : 'tile_actions_item_view',
    },

    className: "tile-actions",

    template: "#tile_actions_layout",

    mergeOptions: [],

    initialize: function(options) {
      Mn.mergeOptions(this, options, this.mergeOptions);
      this.addListeners();
    },

    addListeners: function() {}

  });

});
