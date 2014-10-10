define([
  "app"
  , "babysitter/app_layout_babysitter"
],function(App, AppLayoutBabySitter){

  App.Navbar.Views.NavbarLayout = Backbone.Marionette.LayoutView.extend({

    id: "navbar-layout-view",

    className: "",

    template: "#navbar_layout",

    regions: {
      // navbarRegion: "#app-navbar-region",
      // mainRegion: "#app-main-region"
    },

    initialize: function initialize() {
      this.addToBabySitter();
    },

    addToBabySitter: function addToBabySitter() {
      AppLayoutBabySitter.add(this, "BabySitter:App:AppLayout:NavbarLayout");
    }

  });

  return App.Navbar.Views.NavbarLayout;
});