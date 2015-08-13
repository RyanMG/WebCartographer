define(function(require) {

  var Mn = require('marionette');

  return Mn.Behavior.extend({

    ui: {
      grid: '#grid'
    },

    events: {},

    onBuildMap: function onBuildMap() {
      var height = this.view.height * 64
        , width = this.view.width * 64
        , texture = 'url(img/' + this.view.bg_texture + '_floor_bg.jpg)'
        , top = 0 - (height / 2) + 50
        , left = 0 - (width / 2);

      this.view.$el.css({
        'height': height,
        'width': width,
        'margin-top': top,
        'margin-left': left,
        'background-image': texture
      });
      this.ui.grid.css({
        'height': height,
        'width': width,
        'margin-top': top - 2,
        'margin-left': left - 2
      });
      for (var i = 1; i < this.view.height; i++) {
        $('<div class="grid-line grid-line-v">').css({ left: i * 64 }).appendTo(this.ui.grid);
        $('<div class="grid-line grid-line-h">').css({ top: i * 64 }).appendTo(this.ui.grid);
      }
    }

  });
});
