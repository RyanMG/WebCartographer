define(function(require) {

  var BackBone      = require('backbone')
    , _             = require('underscore')
    , $             = require('jquery');

  var TileModel = BackBone.Model.extend({

    defaults: {
      name     : 'No Name',
      texture  : 'Unknown',
      feature  : 'Unknown',
      width    : 0,
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
    }
  });

  var TileCollection = BackBone.Collection.extend({

    model: TileModel

  });

  var _buildElement = function(src) {
    var elementString = '<img src=\'' + src + '\' class=\'tile\' draggable=\'true\' />';
    return $(elementString);
  };

  return TileCollection;
});
