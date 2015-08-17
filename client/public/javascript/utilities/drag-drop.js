define(function(require) {

  var touchCoordinateVariable = navigator.userAgent.match(/OS [1-4](?:_\d+)+ like Mac/) ? "page" : "client";

  function DragDrop(evt, el, isTouch) {

    this.dragData = {};
    this.dragDataTypes = [];
    this.dragImage = null;
    this.dragImageTransform = null;
    this.dragImageWebKitTransform = null;
    this.el = el || evt.target;
    this.isTouch = isTouch || false;
    this.moveHandler, this.endHandler, this.canceHandler;

    if (isTouch) {
      this.dispatchDragStart();
      this.createDragImage();
      this.translateDragImage(-9999, -9999);

    } else {
      this.setupDragImage(evt, el);
    }

    this.listen();
  }

  DragDrop.prototype = {

    listen: function() {

      if (this.isTouch) {
        this.moveHandler  = _onEvt(document, "touchmove", this.move, this)
        this.endHandler   = _onEvt(document, "touchend", ontouchend, this)
        this.canceHandler = _onEvt(document, "touchcancel", this.cleanup, this);

      } else {
        this.end = _onEvt(document, "dragend", this.cleanup, this);
      }

      _onEvt(document, "dragover", this.preventDefaultEvent, this);
      _onEvt(document, "dragenter", this.preventDefaultEvent, this);

      function ontouchend(evt) {
        this.dragend(evt, evt.target);
        this.cleanup();
      }
    },

    cleanup: function() {
      this.dragDataTypes = [];
      if (this.dragImage != null) {
        this.dragImage.parentNode.removeChild(this.dragImage);
        this.dragImage = null;
        this.dragImageTransform = null;
        this.dragImageWebKitTransform = null;
      }
      this.el = this.dragData = null;
      return [this.moveHandler, this.endHandler, this.canceHandler].forEach(function(handler) {
        if (handler) {
          return handler.off();
        }
      });
    },

    preventDefaultEvent: function(evt) {
      evt.preventDefault();
      evt.stopPropagation();
    },

    move: function(evt) {
      var pageXs = [], pageYs = [];
      [].forEach.call(evt.changedTouches, function(touch, index) {
        pageXs.push(touch.pageX);
        pageYs.push(touch.pageY);
      });

      var x = _average(pageXs) - (parseInt(this.dragImage.offsetWidth, 10) / 2);
      var y = _average(pageYs) - (parseInt(this.dragImage.offsetHeight, 10) / 2);
      this.translateDragImage(x, y);
    },

    hideDragImage: function() {
      if (this.dragImage && this.dragImage.style["display"] != "none") {
        this.dragImageDisplay = this.dragImage.style["display"];
        this.dragImage.style["display"] = "none";
      }
    },

    showDragImage: function() {
      if (this.dragImage) {
        this.dragImage.style["display"] = this.dragImageDisplay ? this.dragImageDisplay : "block";
      }
    },

    // We use translate instead of top/left because of sub-pixel rendering and for the hope of better performance
    // http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/
    translateDragImage: function(x, y, zIndex) {
      var translate = " translate(" + x + "px," + y + "px)";

      if (this.dragImageWebKitTransform !== null) {
        this.dragImage.style["-webkit-transform"] = this.dragImageWebKitTransform + translate;
      }
      if (this.dragImageTransform !== null) {
        this.dragImage.style["transform"] = this.dragImageTransform + translate;
      }
      if ( !_.isUndefined(zIndex) ) {
        this.dragImage.style["z-index"] = zIndex;
      }
    },

    dragend: function(evt) {

      this.hideDragImage();
      var target = _elementFromTouchEvent(this.el, evt)
      this.showDragImage();

      if (target) {
        this.dispatchDrop(target, evt)
      }

      var dragendEvt = document.createEvent("Event");
      dragendEvt.initEvent("dragend", true, true);
      this.el.dispatchEvent(dragendEvt);
    },

    dispatchDrop: function(target, evt) {
      var dropEvt = document.createEvent("Event");
      dropEvt.initEvent("drop", true, true);

      var touch = evt.changedTouches[0];
      var x = touch[touchCoordinateVariable + 'X'];
      var y = touch[touchCoordinateVariable + 'Y'];
      dropEvt.offsetX = x - target.x;
      dropEvt.offsetY = y - target.y;

      dropEvt.dataTransfer = {
        types: this.dragDataTypes,
        getData: function(type) {
          return this.dragData[type];
        }.bind(this)
      };
      dropEvt.preventDefault = function() {
         // https://www.w3.org/Bugs/Public/show_bug.cgi?id=14638 - if we don't cancel it, we'll snap back
      }.bind(this);

      target.dispatchEvent(dropEvt);
    },

    dispatchDragStart: function() {
      var evt = document.createEvent("Event");
      evt.initEvent("dragstart", true, true);
      evt.dataTransfer = {
        setData: function(type, val) {
          this.dragData[type] = val;
          if (this.dragDataTypes.indexOf(type) == -1) {
            this.dragDataTypes[this.dragDataTypes.length] = type;
          }
          return val;
        }.bind(this),
        dropEffect: "move"
      };
      this.el.dispatchEvent(evt);
    },

    setupDragImage: function(evt, el) {
      if ( 'setDragImage' in evt.originalEvent.dataTransfer) {
        var dragImgNode = this.createDragImage();
        this.translateDragImage(0, 0, -1);
        evt.originalEvent.dataTransfer.setDragImage(dragImgNode, 0, 0);
        el.classList.add('is-being-dragged')
      }

      evt.originalEvent.dataTransfer.setData( 'text', '' );
    },

    createDragImage: function() {
      this.dragImage = this.el.cloneNode(true);

      _duplicateStyle(this.el, this.dragImage);

      this.dragImage.style["position"] = "absolute";
      this.dragImage.style["left"] = "0px";
      this.dragImage.style["top"] = "0px";
      this.dragImage.style["z-index"] = "999999";
      this.dragImage.style["pointer-events"] = "none";

      var transform = this.dragImage.style["transform"];
      if (typeof transform !== "undefined") {
        this.dragImageTransform = "";
        if (transform != "none") {
          this.dragImageTransform = transform.replace(/translate\(\D*\d+[^,]*,\D*\d+[^,]*\)\s*/g, '');
        }
      }

      var webkitTransform = this.dragImage.style["-webkit-transform"];
      if (typeof webkitTransform !== "undefined") {
        this.dragImageWebKitTransform = "";
        if (webkitTransform != "none") {
          this.dragImageWebKitTransform = webkitTransform.replace(/translate\(\D*\d+[^,]*,\D*\d+[^,]*\)\s*/g, '');
        }
      }

      document.body.appendChild(this.dragImage);
      return this.dragImage;
    }
  }

  function _duplicateStyle(srcNode, dstNode) {
    // Is this node an element?
    if (srcNode.nodeType == 1) {
      // Remove any potential conflict attributes
      dstNode.removeAttribute("id");
      dstNode.removeAttribute("class");
      dstNode.removeAttribute("style");
      dstNode.removeAttribute("draggable");

      // Clone the style
      var cs = window.getComputedStyle(srcNode);
      for (var i = 0; i < cs.length; i++) {
        var csName = cs[i];
        dstNode.style.setProperty(csName, cs.getPropertyValue(csName), cs.getPropertyPriority(csName));
      }
    }
  }

  function _elementFromTouchEvent(el,event) {
    var touch = event.changedTouches[0];
    var target = document.elementFromPoint(
      touch[touchCoordinateVariable + "X"],
      touch[touchCoordinateVariable + "Y"]
    );
    return target
  }

  function _onEvt(el, evt, handler, context) {
    if(context) handler = handler.bind(context)
    el.addEventListener(evt, handler);
    return {
      off: function() {
        return el.removeEventListener(evt, handler);
      }
    };
  }

  function _average(arr) {
    if (arr.length === 0) return 0;
    return arr.reduce((function(s, v) {
      return v + s;
    }), 0) / arr.length;
  }

  return DragDrop;

});
