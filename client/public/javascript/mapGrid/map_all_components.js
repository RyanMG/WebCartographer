define([
  "app"
], function(App) {

  App.Map = {
    Controllers: {},
    Views: {}
  };

  var $mapComponentsDeferred = new $.Deferred();

  require([
    "mapGrid/map_main_controller"
    ,"mapGrid/map_layout_view"
    ,"mapGrid/map_layout_controller"
    ,"mapGrid/behaviors/tile_mover_behavior"
    ,"mapGrid/behaviors/build_map_behavior"
  ], function() {

    $mapComponentsDeferred.resolve();
  });

  return $mapComponentsDeferred.promise();
});
