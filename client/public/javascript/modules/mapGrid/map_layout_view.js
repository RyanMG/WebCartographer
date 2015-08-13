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
      'TileMover': {},
      'MapBuilder': {}
    },

    ui: {},

    events: {
      "click": "onMapGridClick"
    },

    onMapGridClick: function onMapGridClick(evt) {
    },

    initialize: function initialize(options) {
      this.options = _.extend({}, options);
      this.addToBabySitter();
    },

    onRender: function onRender() {
      this.triggerMethod('buildMap');
    },

    addToBabySitter: function addToBabySitter() {
      AppLayoutBabySitter.add(this, "BabySitter:App:AppLayout:MapLayout");
    }

  });

  return App.Map.Views.MapLayout;
});
