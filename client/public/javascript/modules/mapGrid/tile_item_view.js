define(function(require) {

  var Mn                 = require('marionette')
    , Radio              = require('backbone.radio');

  return Mn.ItemView.extend({

    attributes: function() {
      var src = this.model.get('src');
      return {
        'data-view-name' : 'tile_item_view',
        'src'            : src
      }
    },

    tagName: 'img',

    className: "tile",

    template: _.template(""),

    mergeOptions: [],

    ui: {},

    events: {
    },

    initialize: function(options) {
      Mn.mergeOptions(this, options, this.mergeOptions);
    },

    addListeners: function() {
      Radio.reply('tileView', 'doThing', this.doThing, this);
    },

    onBeforeRender: function() {

      this.$el.css({
        top  : this.model.get('currentY'),
        left : this.model.get('currentX')
      })
    },

    rotateClockwise: function() {
      this.$el.removeClass('rotate-' + this.rotation);
      this.rotation += 90;
      this.$el.addClass('rotate-' + this.rotation);
      if (this.rotation === 360) {
        _.delay(function(ctx) {
          $element.removeClass('animated rotate-360');
          $element.addClass('rotate-0');
          ctx.rotation = 0;

          _.delay(function(ctx) {
            this.$el.addClass('animated');
          }, 10, ctx);

        }, 400, this);
      }
    },

    rotateCounterClockwise: function() {
      this.$el.removeClass('rotate-' + this.rotation);
      this.rotation -= 90;
      this.$el.addClass('rotate-' + this.rotation);
      if (this.rotation === -90) {
        _.delay(function(ctx) {
          this.$el.removeClass('animated rotate--90');
          this.$el.addClass('rotate-270');
          ctx.rotation = 270;

          _.delay(function(ctx) {
            this.$el.addClass('animated');
          }, 10, ctx);

        }, 400, this);
      }
    }

  });

});
