define(function(require) {

	var Marionette = require('marionette')
    , Radio      = require('backbone.radio');

  return Marionette.LayoutView.extend({

    template: "#app_layout",

    el: '#main-region',

    regions: {
      toolbar: "#app-toolbar-region",
      map: "#app-map-region",
      tilePicker: "#app-tile-picker-region",
      dialog: "#app-dialog-region"
    },

    events: {
      'touchmove': 'onTouchMove'
    },

    initialize: function () {
      Radio.reply('rootView', 'show:mainView', this.showMainView, this);
      window.app = this;
    },

    showMainView: function(view) {
      var ToolbarView    = require('modules/toolbar/toolbar_layout_view')
        , MapView        = require('modules/mapGrid/map_composite_view')
        , TileCollection = require('modules/mapGrid/entities/tile_entity')
        , TilePickerView = require('modules/tilePicker/tile_picker_layout_view');

      this.getRegion('toolbar').show( new ToolbarView() );
      this.getRegion('tilePicker').show( new TilePickerView() );
      this.getRegion('map').show( new MapView({
        collection: new TileCollection(),
        height: 10,
        width: 10,
        bg_texture: 'wood'
      }) );
    },

    // Prevent overflow on iOS when dragging tiles
    onTouchMove: function(evt) {
      evt.preventDefault();
    }
  });

});
