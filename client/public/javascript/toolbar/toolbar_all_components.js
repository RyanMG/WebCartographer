define([
  "app"
], function(App) {

  App.Toolbar = {
    Controllers: {},
    Views: {}
  };

  var $toolbarComponentsDeferred = new $.Deferred();

  require([
    "toolbar/toolbar_layout_view"
    ,"toolbar/toolbar_layout_controller"
    ,"toolbar/toolbar_main_controller"
  ], function() {

    $toolbarComponentsDeferred.resolve();
  });

  return $toolbarComponentsDeferred.promise();
});
