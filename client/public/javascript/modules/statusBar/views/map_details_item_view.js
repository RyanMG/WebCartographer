define(function(require) {

  var Mn = require('marionette');

  return Mn.ItemView.extend({

    attributes: {
      'data-view-name' : 'map_details_item_view',
    },

    className: 'map-details',

    template: '#map_details_layout',

    templateHelpers: {
      mapName: 'My Map',
      mapAuthor: 'David R Hall',
      mapDescription: 'Darkest Dungeon'
    },

    mergeOptions: [],

    initialize: function(options) {
      Mn.mergeOptions(this, options, this.mergeOptions);
      this.addListeners();
    },

    addListeners: function() {}

  });

});
