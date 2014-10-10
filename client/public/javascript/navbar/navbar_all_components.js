define([
  "app"
], function(App) {

  "use strict";

  App.Navbar = {
    Controllers: {},
    Views: {}
  };

  var $navbarComponentsDeferred = new $.Deferred();

  require([
    "navbar/navbar_main_controller"
    ,"navbar/navbar_layout_controller"
    ,"navbar/navbar_layout_view"
  ], function() {

    $navbarComponentsDeferred.resolve();
  });

  return $navbarComponentsDeferred.promise();
});
