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
      Radio.reply('rootView', 'show:toolbar', this.showInToolbarRegion, this);
      Radio.reply('rootView', 'show:map', this.showInMapRegion, this);
      Radio.reply('rootView', 'show:dialog', this.showInDialogRegion, this);
    },

    showInToolbarRegion: function(view) {
      this.getRegion('toolbar').show( new view() );
    },

    showInMapRegion: function(view) {
      this.getRegion('toolbar').show( new view() );
    },

    showInDialogRegion: function(view) {
      this.getRegion('toolbar').show( new view() );
    }
  });

});
