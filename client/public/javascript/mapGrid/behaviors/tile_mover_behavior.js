define([
  "app"
], function(App) {

  App.Behaviors.TileMover = Backbone.Marionette.Behavior.extend({

    ui: {},

    events: {

    },

    onInitializeTile: function initializeTile($element, isVisible) {
      this.view.$el.find('.selected').removeClass('selected');
      this.ui.tile = $element;
      this.ui.tile.addClass('animate').addClass('selected');
      $('body').on('mousemove' this.view.$el, function() {
        console.log(arguments);
      });
    }

  });

  return App.Behaviors.TileMover;
});
