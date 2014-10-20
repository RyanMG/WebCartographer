define([
  "app"
  , "babysitter/app_layout_babysitter"
],function(App, AppLayoutBabySitter){

  App.Map.Views.MapLayout = Backbone.Marionette.ItemView.extend({

    attributes: {
      'data-view-name' : 'map-layout-view',
    },

    className: "mapGrid",

    template: "#map_layout",

    behaviors: {
      'TileMover': {}
    },

    ui: {},

    hammerEvents: {
      "tap": "onMapGripTap"
    },

    onMapGripTap: function onMapGripTap(evt) {
      var clicked = $(evt.gesture.target).closest('.tile');
      if (clicked.length === 0) return;
      this.triggerMethod('initializeTile', clicked, true);
    },

    initialize: function initialize() {
      this.addToBabySitter();
    },

    addToBabySitter: function addToBabySitter() {
      AppLayoutBabySitter.add(this, "BabySitter:App:AppLayout:MapLayout");
    }

  });

  return App.Map.Views.MapLayout;
});