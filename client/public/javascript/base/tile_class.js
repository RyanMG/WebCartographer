define(function(require) {

  function Tile(evt) {
    var tileSrc = evt.originalEvent.dataTransfer.getData( 'text' )
      , posX = evt.originalEvent.offsetX || 0
      , posY = evt.originalEvent.offsetY || 0;

    this.rotation = 0;
    this.currentX = posX;
    this.currentY = posY;
    this.$el = _buildElement(tileSrc);
  }

  Tile.prototype = {

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
  }

  var _buildElement = function(src) {
    var elementString = "<img src='" + src + "' class='tile' draggable='true' />";
    return $(elementString);
  }

  return Tile;

});
