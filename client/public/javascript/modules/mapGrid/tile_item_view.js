define(function(require) {

  var Mn     = require('marionette')
    , Radio  = require('backbone.radio')
    , Hammer = require('hammer')
    , rAF    = require('../../utilities/request-animation-frame');

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
      'click' : 'onClick'
    },

    initialize: function(options) {
      Mn.mergeOptions(this, options, this.mergeOptions);
      this.id = this.model.id;
      this.animating = false;
      this.position = {
        x        : this.model.get('currentX'),
        y        : this.model.get('currentY'),
        rotation : this.model.get('rotation')
      };
    },

    addListeners: function() {},

    onBeforeRender: function() {
      this.updatePosition();
      this.select();
    },

    onClick: function() {
      this.select();
    },

    select: function() {
      this.triggerMethod('child:selected');
      this.$el.addClass('selected animated').attr('draggable', true);
      var manager = new Hammer.Manager(this.el);

      manager.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
      manager.on('panstart panmove', this.onPan.bind(this) );
      manager.on('panend', this.onPanEnd.bind(this) );
    },

    deselect: function() {
      this.$el.removeClass('selected animated').attr('draggable', false);
    },

    requestPositionUpdate: function() {
      if (!this.animating) {
        rAF( this.updatePosition.bind(this) );
        this.animating = true;
      }
    },

    updatePosition: function() {
      var value    = [
            'translate(' + this.position.x + 'px, ' + this.position.y + 'px)',
            'rotate(' + this.position.rotation + 'deg)'
          ];

      value = value.join(" ");
      this.el.style.webkitTransform = value;
      this.el.style.mozTransform = value;
      this.el.style.transform = value;
      this.animating = false;
    },

    rotateClockwise: function() {
      this.position.rotation += 90;
      requestPositionUpdate();
      this.model.set('rotation', this.position.rotation);
    },

    rotateCounterClockwise: function() {
      this.position.rotation -= 90;
      requestPositionUpdate();
      this.model.set('rotation', this.position.rotation);
    },

    onPan: function(evt) {
      transform.translate = {
        x: START_X + evt.deltaX,
        y: START_Y + evt.deltaY
      };
      requestPositionUpdate();
    },

    onPanEnd: function(evt) {
      transform.translate.x = Math.round(transform.translate.x / 32) * 32;
      transform.translate.y = Math.round(transform.translate.y / 32) * 32;
      START_X = transform.translate.x;
      START_Y = transform.translate.y;
      requestElementUpdate();
    }
  });

});
