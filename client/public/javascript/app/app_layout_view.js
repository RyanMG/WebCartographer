define([
  "app"
],function(App){

  App.Views.AppLayout = Backbone.Marionette.LayoutView.extend({

    id: "app-layout-view",

    className: "",

    template: "#app_layout",

    regions: {
      navbarRegion: "#app-navbar-region",
      mainRegion: "#app-main-region"
    }

  });

  return App.Views.AppLayout;
});