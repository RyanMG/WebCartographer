define([
  "app"
],function(App){

  App.Views.AppLayout = Backbone.Marionette.LayoutView.extend({

    template: "#app_layout",

    regions: {
      actionbarRegion: "#app-actionbar-region",
      mapRegion: "#app-map-region"
    }
  });

  return App.Views.AppLayout;
});