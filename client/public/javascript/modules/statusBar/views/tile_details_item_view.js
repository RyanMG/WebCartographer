define(function(require) {

  var Mn     = require('marionette')
    , Radio  = require('backbone.radio');

  return Mn.ItemView.extend({

    attributes: {
      'data-view-name' : 'tile_details_item_view',
    },

    className: "tile-details",

    template: "#tile_details_layout",

    mergeOptions: [],

    initialize: function(options) {
      Mn.mergeOptions(this, options, this.mergeOptions);
      this.addListeners();
    },

    addListeners: function() {}

  });

});
