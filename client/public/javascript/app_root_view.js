define(function(require) {

	var Marionette = require('marionette')
    , Radio      = require('backbone.radio');

  return Marionette.LayoutView.extend({

    template: "#app_layout",

    el: '#main-region',

    regions: {
      toolbar: "#app-toolbar-region",
      map: "#app-map-region",
      dialog: '#app-dialog-region'
    },

    initialize: function () {
      Radio.reply('rootView', 'show:mainView', this.showMainView, this);
    },

    showMainView: function(view) {
      var ToolbarView = require('modules/toolbar/toolbar_layout_view')
        , MapView     = require('modules/mapGrid/map_layout_view');

      this.getRegion('toolbar').show( new ToolbarView() );
      this.getRegion('map').show( new MapView() );
    }
  });

});
