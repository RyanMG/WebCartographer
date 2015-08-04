define([
  "app"
], function(App) {

  var controller;

  App.Toolbar.Controllers.Main = Backbone.Marionette.Controller.extend({

    initialize: function initialize(){},

  });

  // ======================
  // Listeners
  // ======================

  App.addInitializer(function() {
    controller = new App.Toolbar.Controllers.Main();
  });

  App.comply("Toolbar:MainController: <command> ", function() {
    // Do thing...
  });

  return App.Toolbar.Controllers.Main;
});
