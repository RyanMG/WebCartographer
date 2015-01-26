define([
  "app"
], function( App ) {

  App.Controllers = {};
  App.Views = {};

  var $appComponentsDeferred = new $.Deferred();

  require([
    "app/app_main_controller"
    ,"app/app_layout_controller"
    ,"app/app_layout_view"
  ], function() {

    $appComponentsDeferred.resolve();
  });

  return $appComponentsDeferred.promise();
});
