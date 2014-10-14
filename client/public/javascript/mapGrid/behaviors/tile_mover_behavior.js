define([
  "app"
  ,"hammerjs"
], function(App, Hammer) {

  "use strict";

  var reqAnimationFrame = (function () {
    return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  })();

  App.Behaviors['TileMover'] = Backbone.Marionette.Behavior.extend({

    ui: {},

    events: {

    },

    onInitializeTile: function initializeTile($element) {
      this.ui.tile = $element;
      this.ui.tile.addClass('animate');
      this.setProperties();

      var hammer = new Hammer.Manager(this.ui.tile[0]);

      hammer.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
      hammer.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(hammer.get('pan'));

      hammer.on("panstart panmove", this.onPan.bind(this));
      hammer.on("panend", this.onPanEnd.bind(this));
      hammer.on("rotatestart rotatemove", this.onRotate.bind(this));
      
      this.boundUpdateElementTransform = this.updateElementTransform.bind(this);

      this.requestElementUpdate();
    },

    setProperties: function setProperties() {
      this.START_X = Math.round((this.view.$el.width() - this.ui.tile.width()) / 2);
      this.START_Y = Math.round((this.view.$el.height() - this.ui.tile.height()) / 2);
      this.ticking = false;
      this.transform = {
        translate: { x: this.START_X, y: this.START_Y },
        angle: 0
      };
    },

    updateElementTransform: function updateElementTransform() {
      var value = [
        'translate(' + this.transform.translate.x + 'px, ' + this.transform.translate.y + 'px)',
        'rotate(' + this.transform.angle + 'deg)'
      ].join(" ");

      this.ui.tile[0].style.webkitTransform = value;
      this.ui.tile[0].style.mozTransform = value;
      this.ui.tile[0].style.transform = value;
      this.ticking = false;
    },

    requestElementUpdate: function requestElementUpdate() {
      if(!this.ticking) {
        reqAnimationFrame(this.boundUpdateElementTransform);
        this.ticking = true;
      }
    },
    
    onPanEnd: function onPanEnd(ev) {
      this.transform.translate.x = Math.round(this.transform.translate.x / 32) * 32;
      this.transform.translate.y = Math.round(this.transform.translate.y / 32) * 32;
      this.START_X = this.transform.translate.x;
      this.START_Y = this.transform.translate.y;
      this.requestElementUpdate();
    },

    onPan: function onPan(ev) {
      this.ui.tile.removeClass('animate');
      this.transform.translate = {
        x: this.START_X + ev.deltaX,
        y: this.START_Y + ev.deltaY
      };
      if (this.transform.translate.x < 0) this.transform.translate.x = 0;
      if (this.transform.translate.y < 0) this.transform.translate.y = 0;
      if (this.transform.translate.x > this.view.$el.width() - 128) this.transform.translate.x = this.view.$el.width() - 128;
      if (this.transform.translate.y > this.view.$el.height() - 128) this.transform.translate.y = this.view.$el.height()- 128;
      this.requestElementUpdate();
    },

    onRotate: function onRotate(ev) {
      this.ui.tile.removeClass('animate');
      this.transform.angle += 90;
      this.requestElementUpdate();
    },

    onRotateClockwise: function onRotateClockwise() {
      this.ui.tile.removeClass('animate');
      this.transform.angle += 90;
      this.requestElementUpdate();
    },

    onRotateCounterClockwise: function onRotateCounterClockwise() {
      this.ui.tile.removeClass('animate');
      this.transform.angle -= 90;
      this.requestElementUpdate();
    }

  });

  return App.Behaviors.TileMover;
});
