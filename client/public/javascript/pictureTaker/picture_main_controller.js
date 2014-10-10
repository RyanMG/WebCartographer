define([
  "app"
], function(App) {

  "use strict";

  var controller;

  App.PictureTaker.Controllers.Main = Backbone.Marionette.Controller.extend({

    initialize: function initialize(){},

    initializeVideo: function initializeVideo() {
      var canvas = document.getElementById("canvas"),
          context = canvas.getContext("2d"),
          video = document.getElementById("video"),
          videoObj = { "video": true },
          errBack = function(error) {
            console.log("Video capture error: ", error.code); 
          };

      if (navigator.webkitGetUserMedia) {
        navigator.webkitGetUserMedia(videoObj, function(stream){
          video.src = window.webkitURL.createObjectURL(stream);
          video.play();
        }, errBack);
      }
    }

  });

  // ======================
  // Listeners
  // ======================

  controller = new App.Navbar.Controllers.Main();

  App.comply("PictureTaker:MainController:InitializeVideo", function() {
    controller.initializeVideo();
  });

  return App.PictureTaker.Controllers.Main;
});