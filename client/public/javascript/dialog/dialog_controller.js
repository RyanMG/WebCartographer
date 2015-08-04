define(function(require) {

  var Mn = require('marionette')
    , DialogView = require('./dialog_item_view')
    , app = require('app')
    , globalChannel = Backbone.Radio.channel('global');

  return Marionette.Object.extend({

    initialize: function initialize(){},

    showNewMapDialog: function showNewMapDialog() {
      var dialogView = new DialogView();
      app.dialogRegion.show(dialogView);
    },

    hideMapDialog: function hideMapDialog() {
      app.dialogRegion.reset();      
    }

  });
