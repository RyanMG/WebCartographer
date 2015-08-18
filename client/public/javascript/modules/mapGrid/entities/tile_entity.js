define(function(require) {

  var BackBone      = require('backbone')
    , _             = require('underscore');

  var TileModel = BackBone.Model.extend({

    defaults: {
      name     : 'No Name',
      texture  : 'Unknown',
      feature  : 'Unknown',
      wdith    : 0,
      height   : 0,
      rotation : 0,
      currentX : 0,
      currentY : 0,
      currentZ : 0,
      src      : 'file:///Users/DrHall/Desktop/gitRepos/WebCartographer/client/public/img/black_default_1x1_01.jpg'
    },

    initialize: function(modelData, options) {
      var tilename = _.last( modelData.src.split('/') ).split('.')[0]
        , parts    = tilename.split('_')
        , size     = parts[2].split('x')
        , tileX    = modelData.x
        , tileY    = modelData.y
        , posX     = options.mapX - tileX
        , posY     = options.mapY - tileY
        ;

      this.set({
        name     : tilename,
        texture  : parts[0],
        feature  : parts[1],
        width    : size[0],
        height   : size[1],
        currentX : Math.round(posX / 32) * 32,
        currentY : Math.round(posY / 32) * 32
      });

      this.id = _.uniqueId('tile-');

      this.$el = _buildElement(modelData.src);
      this.$el.css({
        left: this.get('currentX'),
        top: this.get('currentY')
      });
      this.$el.data('tile-id', this.id );
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

  var TileCollection = BackBone.Collection.extend({

    model: TileModel

  });

  var _buildElement = function(src) {
    var elementString = "<img src='" + src + "' class='tile' draggable='true' />";
    return $(elementString);
  };

  return TileCollection;
});
