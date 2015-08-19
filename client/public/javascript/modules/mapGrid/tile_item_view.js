define(function(require) {

  var Mn    = require('marionette')
    , Radio = require('backbone.radio')
    , rAF   = require('../../utilities/request-animation-frame');

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
      'click': 'onClick'
    },

    modelEvents: {
      'change:currentX change:currentX change:rotation' : 'updatePosition'
    },

    initialize: function(options) {
      Mn.mergeOptions(this, options, this.mergeOptions);
      this.id = this.model.id;
    },

    addListeners: function() {
      Radio.reply('tileView', 'doThing', this.doThing, this);
    },

    onBeforeRender: function() {
      this.updatePosition();
      this.selectTile();
    },

    onClick: function() {
      this.selectTile();
    },

    selectTile: function() {
      this.triggerMethod('child:selected');
      this.$el.addClass('selected animated').attr('draggable', true);
    },

    deselectTile: function() {
      this.$el.removeClass('selected animated').attr('draggable', false);
    },

    requestPositionUpdate: function() {
      rAF(updatePosition);
    },

    updatePosition: function() {
      var xPos     = this.model.get('currentX')
        , yPos     = this.model.get('currentY')
        , rotation = this.model.get('rotation')
        , value    = [
            'translate(' + xPos + 'px, ' + yPos + 'px)',
            'rotate(' + rotation + 'deg)'
          ];

      value = value.join(" ");
      this.el.style.webkitTransform = value;
      this.el.style.mozTransform = value;
      this.el.style.transform = value;
    },

    rotateClockwise: function() {
      var newRotation = this.model.get('rotation') + 90;
      this.model.set('rotation', newRotation);
    },

    rotateCounterClockwise: function() {
      var newRotation = this.model.get('rotation') - 90;
      this.model.set('rotation', newRotation);
    }

  });

});
