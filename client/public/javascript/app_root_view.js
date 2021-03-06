define(function(require) {

	var Marionette = require('marionette')
    , Radio      = require('backbone.radio');

  return Marionette.LayoutView.extend({

    template: '#app_layout',

    el: '#main-region',

    regions: {
      toolbar    : '#app-toolbar-region',
      map        : '#app-map-region',
      tilePicker : '#app-tile-picker-region',
      status     : '#app-status-region',
      dialog     : '#app-dialog-region',
      settings   : '#app-settings-region'
    },

    events: {
      'touchmove': 'onTouchMove'
    },

    initialize: function () {
      Radio.reply('rootView', 'show:mainView', this.showMainView, this);
    },

    showMainView: function(view) {
      var ToolbarView    = require('modules/toolbar/toolbar_item_view')
        , MapView        = require('modules/mapGrid/map_layout_view')
        , TilePickerView = require('modules/tilePicker/tile_picker_item_view')
        , TileCollection = require('modules/tilePicker/entities/tile_entity')
        , StatusView     = require('modules/statusBar/status_layout_view')
        , SettingsView   = require('modules/settings/settings_item_view');

      var tiles = new TileCollection();

      this.getRegion('toolbar').show( new ToolbarView() );

      this.getRegion('tilePicker').show( new TilePickerView({
        collection: tiles
      }) );

      this.getRegion('status').show( new StatusView() );

      this.getRegion('map').show( new MapView({
        height: 10,
        width: 10,
        bg_texture: 'wood'
      }) );

      this.getRegion('settings').show( new SettingsView() );
    },

    // Prevent overflow on iOS when dragging tiles
    onTouchMove: function(evt) {
      evt.preventDefault();
    }
  });

});
