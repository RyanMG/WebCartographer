define([
  "app"
], function(App) {

  App.Dialog = {
    Controllers: {},
    Views: {}
  };

  var $dialogComponentsDeferred = new $.Deferred();

  require([
    "dialog/dialog_main_controller"
    ,"dialog/dialog_main_view"
  ], function() {

    $dialogComponentsDeferred.resolve();
  });

  return $dialogComponentsDeferred.promise();
});
