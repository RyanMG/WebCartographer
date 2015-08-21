define(function(require) {

  var Mn    = require('marionette')
    , Radio = require('backbone.radio');

  return Mn.LayoutView.extend({

    attributes: {
      'data-view-name' : 'status_layout_view',
    },

    className: 'status-bar',

    template: '#status_layout',

    mergeOptions: [],

    regions: {
      mapDetails  : '#map-details-region',
      tileDetails : '#tile-details-region',
      actions     : '#tile-actions-region'
    },

    ui: {
    },

    events: {
    },

    initialize: function(options) {
      Mn.mergeOptions(this, options, this.mergeOptions);
      this.addListeners();
    },

    addListeners: function() {
      Radio.reply('statusView', 'event', this.callback, this);
    },

    onRender: function() {
      var TileDetailsView = require('./views/tile_details_item_view')
        , TileActionsView = require('./views/tile_actions_item_view');

      this.getRegion('details').show( new TileDetailsView() );
      this.getRegion('actions').show( new TileActionsView() );
    }

  });

});
