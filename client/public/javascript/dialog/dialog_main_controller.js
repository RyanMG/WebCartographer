define([
  "app"
], function(App) {

  var controller;

  App.Dialog.Controllers.Main = Backbone.Marionette.Controller.extend({

    initialize: function initialize(){},

    showNewMapDialog: function showNewMapDialog() {
      var dialogView = new App.Dialog.Views.DialogLayout();
      App.dialogRegion.show(dialogView);
    },

    hideMapDialog: function hideMapDialog() {
      App.dialogRegion.reset();      
    }

  });

  // ======================
  // Listeners
  // ======================

  App.addInitializer(function() {
    controller = new App.Dialog.Controllers.Main();
  });

  App.comply("Navbar:DialogController:showNewMapDialog", function() {
    controller.showNewMapDialog();
  });

  App.comply("Navbar:DialogController:hideMapDialog", function() {
    controller.hideMapDialog();
  });

  return App.Dialog.Controllers.Main;
});
