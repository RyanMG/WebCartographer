define([
  "app"
], function(App) {

  "use strict";

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
  ], function() {

    $mapComponentsDeferred.resolve();
  });

  return $mapComponentsDeferred.promise();
});
