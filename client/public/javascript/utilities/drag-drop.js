define(function(require) {

  function DragDrop(event, el, isTouch) {

    this.dragData = {};
    this.dragDataTypes = [];
    this.dragImage = null;
    this.dragImageTransform = null;
    this.dragImageWebKitTransform = null;
    this.el = el || event.target;

    if (isTouch) {
      this.dispatchDragStart();
      this.createDragImage();
      this.translateDragImage(-9999, -9999);

    } else {
      this.setupDragImage(event, el);
    }

    this.listen(isTouch);
  }

  DragDrop.prototype = {

    listen: function(isTouch) {
      if (isTouch) {
        var move   = _onEvt(doc, "touchmove", this.move, this)
          , end    = _onEvt(doc, "touchend", ontouchend, this)
          , cancel = _onEvt(doc, "touchcancel", this.cleanup, this);

      } else {
        // _onEvt(document, "dragend", this.dragend, this);
      }

      function ontouchend(event) {
        this.dragend(event, event.target);
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
      return [move, end, cancel].forEach(function(handler) {
        return handler.off();
      });
    },

    move: function(event) {
      var pageXs = [], pageYs = [];
      [].forEach.call(event.changedTouches, function(touch, index) {
        pageXs.push(touch.pageX);
        pageYs.push(touch.pageY);
      });

      var x = average(pageXs) - (parseInt(this.dragImage.offsetWidth, 10) / 2);
      var y = average(pageYs) - (parseInt(this.dragImage.offsetHeight, 10) / 2);
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
    translateDragImage: function(x, y) {
      var translate = " translate(" + x + "px," + y + "px)";

      if (this.dragImageWebKitTransform !== null) {
        this.dragImage.style["-webkit-transform"] = this.dragImageWebKitTransform + translate;
      }
      if (this.dragImageTransform !== null) {
        this.dragImage.style["transform"] = this.dragImageTransform + translate;
      }
    },

    dragend: function(event) {

      if (this.lastEnter) {
        this.dispatchLeave(event);
      }

      this.hideDragImage();
      var target = elementFromTouchEvent(this.el,event)
      this.showDragImage();

      if (target) {
        log("found drop target " + target.tagName);
        this.dispatchDrop(target, event)
      } else {
        log("no drop target")
      }

      var dragendEvt = doc.createEvent("Event");
      dragendEvt.initEvent("dragend", true, true);
      this.el.dispatchEvent(dragendEvt);
      this.cleanup();
    },

    dispatchDrop: function(target, event) {
      var dropEvt = doc.createEvent("Event");
      dropEvt.initEvent("drop", true, true);

      var touch = event.changedTouches[0];
      var x = touch[coordinateSystemForElementFromPoint + 'X'];
      var y = touch[coordinateSystemForElementFromPoint + 'Y'];
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

      once(doc, "drop", function() {
        log("drop event not canceled");
      },this);

      target.dispatchEvent(dropEvt);
    },

    dispatchEnter: function(event) {

      var enterEvt = doc.createEvent("Event");
      enterEvt.initEvent("dragenter", true, true);
      enterEvt.dataTransfer = {
        types: this.dragDataTypes,
        getData: function(type) {
          return this.dragData[type];
        }.bind(this)
      };

      var touch = event.changedTouches[0];
      enterEvt.pageX = touch.pageX;
      enterEvt.pageY = touch.pageY;

      this.lastEnter.dispatchEvent(enterEvt);
    },

    dispatchOver: function(event) {

      var overEvt = doc.createEvent("Event");
      overEvt.initEvent("dragover", true, true);
      overEvt.dataTransfer = {
        types: this.dragDataTypes,
        getData: function(type) {
          return this.dragData[type];
        }.bind(this)
      };

      var touch = event.changedTouches[0];
      overEvt.pageX = touch.pageX;
      overEvt.pageY = touch.pageY;

      this.lastEnter.dispatchEvent(overEvt);
    },

    dispatchLeave: function(event) {

      var leaveEvt = doc.createEvent("Event");
      leaveEvt.initEvent("dragleave", true, true);
      leaveEvt.dataTransfer = {
        types: this.dragDataTypes,
        getData: function(type) {
          return this.dragData[type];
        }.bind(this)
      };

      var touch = event.changedTouches[0];
      leaveEvt.pageX = touch.pageX;
      leaveEvt.pageY = touch.pageY;

      this.lastEnter.dispatchEvent(leaveEvt);
      this.lastEnter = null;
    },

    dispatchDragStart: function() {
      var evt = doc.createEvent("Event");
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
        this.translateDragImage(0, 0);
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

  function _onEvt(el, event, handler, context) {
    if(context) handler = handler.bind(context)
    el.addEventListener(event, handler);
    return {
      off: function() {
        return el.removeEventListener(event, handler);
      }
    };
  }

  function _once(el, event, handler, context) {
    if(context) handler = handler.bind(context)
    function listener(evt) {
      handler(evt);
      return el.removeEventListener(event,listener);
    }
    return el.addEventListener(event,listener);
  }

  return DragDrop;

});
