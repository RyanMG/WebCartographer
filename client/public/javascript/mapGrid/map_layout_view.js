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

    events: {},

    initialize: function initialize() {
      this.addToBabySitter();
    },

    onShow: function onShow() {
      this.triggerMethod('initializeTile', this.$el.find('.tile'));
    },

    addToBabySitter: function addToBabySitter() {
      AppLayoutBabySitter.add(this, "BabySitter:App:AppLayout:MapLayout");
    }

  });

  return App.Map.Views.MapLayout;
});