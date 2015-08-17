define(function(require) {

  var Mn       = require('marionette')
    , _        = require('underscore')
    , DragDrop = require('../../../utilities/drag-drop');

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

    onTouchStart: function(evt) {
      if (el.draggable === true) {
        evt.preventDefault();
        new DragDrop(evt, evt.target, true);
      }
    },

    onDragStart: function(evt) {
      new DragDrop(evt, evt.target, false);
    }

  });

});
