define([
  "app"
], function(App) {

  "use strict";

  App.PictureTaker = {
    Controllers: {},
    Views: {}
  };

  var $pictureComponentsDeferred = new $.Deferred();

  require([
    "pictureTaker/picture_main_controller"
    ,"pictureTaker/picture_layout_view"
    ,"pictureTaker/picture_layout_controller"
  ], function() {

    $pictureComponentsDeferred.resolve();
  });

  return $pictureComponentsDeferred.promise();
});
