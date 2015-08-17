define(function(require) {

  var Mn       = require('marionette')
    , _        = require('underscore')
    , DragDrop = require('../../../utilities/drag-drop')
    , touchCoordinateVariable = navigator.userAgent.match(/OS [1-4](?:_\d+)+ like Mac/) ? "page" : "client";

  return Marionette.Behavior.extend({

    $currentElement: null,

    currentRotation: 0,

    onInitializeTile: function($element, isVisible) {
      if (this.$currentElement) {
        this.$currentElement.removeClass('selected animated');
        this.$currentElement.off("touchstart");
        this.$currentElement.off("dragstart");
      }

      this.$currentElement = $element;
      this.$currentElement.addClass('selected animated rotate-0').attr('draggable', true);
      this.currentRotation = 0;

      this.$currentElement.on("touchstart", this.onTouchStart.bind(this));
      this.$currentElement.on("dragstart", this.onDragStart.bind(this));
    },

    onClearCurrentElement: function() {
      this.$currentElement.off("touchstart");
      this.$currentElement.off("dragstart");
      this.$currentElement = null;
    },

    onRotateClockwise: function() {
      if (!this.$currentElement) {
        return;
      }

      this.$currentElement.removeClass('rotate-' + this.currentRotation);
      this.currentRotation += 90;
      this.$currentElement.addClass('rotate-' + this.currentRotation);
      if (this.currentRotation === 360) {
        _.delay(function(ctx) {
          ctx.$currentElement.removeClass('animated rotate-360');
          ctx.$currentElement.addClass('rotate-0');
          ctx.currentRotation = 0;

          _.delay(function(ctx) {
            ctx.$currentElement.addClass('animated');
          }, 10, ctx);

        }, 400, this);
      }
    },

    onRotateCounterClockwise: function() {
      if (!this.$currentElement) {
        return;
      }

      this.$currentElement.removeClass('rotate-' + this.currentRotation);
      this.currentRotation -= 90;
      this.$currentElement.addClass('rotate-' + this.currentRotation);
      if (this.currentRotation === -90) {
        _.delay(function(ctx) {
          ctx.$currentElement.removeClass('animated rotate--90');
          ctx.$currentElement.addClass('rotate-270');
          ctx.currentRotation = 270;

          _.delay(function(ctx) {
            ctx.$currentElement.addClass('animated');
          }, 10, ctx);

        }, 400, this);
      }
    },

    onTouchStart: function(evt) {
      if (el.draggable === true) {
        evt.preventDefault();
        new DragDrop(evt, evt.target, true);
      }
    },

    onDragStart: function(evt) {
      // new DragDrop(evt, evt.target, false);
    }

  });

});
