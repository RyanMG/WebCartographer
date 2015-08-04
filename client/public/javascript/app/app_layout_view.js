define(function(require) {

	var Marionette = require('marionette');
  
  return Marionette.LayoutView.extend({

    template: "#app_layout",

    el: '#main-region',

    regions: {
      toolbarRegion: "#app-toolbar-region",
      mapRegion: "#app-map-region",
      dialogRegion: '#app-dialog-region'
    }

  });

});
