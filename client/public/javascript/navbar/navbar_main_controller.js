define([
  "app"
], function(App) {

  "use strict";

  var controller;

  App.Navbar.Controllers.Main = Backbone.Marionette.Controller.extend({

    initialize: function initialize(){},


  });

  // ======================
  // Listeners
  // ======================

  controller = new App.Navbar.Controllers.Main();

  App.comply("Navbar:MainController: <command> ", function() {
    // Do thing...
  });

  return App.Navbar.Controllers.Main;
});