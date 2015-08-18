define(function(require) {

  function Tile(evt) {
    var tileSrc  = evt.originalEvent.dataTransfer.getData( 'text' )
      , posX     = evt.originalEvent.offsetX || 0
      , posY     = evt.originalEvent.offsetY || 0
      , tilename = _.last( tileSrc.split('/') ).split('.')[0]
      , parts    = tilename.split('_')
      , size     = parts[2].split('x');

    this.name     = tilename
    this.texture  = parts[0]
    this.feature  = parts[1]
    this.width    = size[0]
    this.height   = size[1]
    this.rotation = 0;

    this.currentX = Math.round(posX / 32) * 32;
    this.currentY = Math.round(posY / 32) * 32;
    this.$el = _buildElement(tileSrc);
    this.$el.css({
      left: this.currentX,
      top: this.currentY
    });
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
