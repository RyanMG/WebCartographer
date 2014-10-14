define([], function(){

  "use strict";

  var App = new Backbone.Marionette.Application()
   , $appDeferred = new $.Deferred();

  App.promise = $appDeferred.promise();

  Backbone.Marionette.Behaviors.behaviorsLookup = App.Behaviors = {};
  
  require([
     "app/app_all_components"
     ,"navbar/navbar_all_components"
     ,"mapGrid/map_all_components"
     , "app/app_router"
  ], function( appComponentsPromise, navbarComponentsPromise, mapComponentsPromise ) {
    $.when( appComponentsPromise, navbarComponentsPromise, mapComponentsPromise ).done(function() {
      // all necessary module definitions have loaded.
      $appDeferred.resolve();
    });
  });

  // Listeners
  // =================

  App.on("start", function App_start(){

    // Render master Layout for entire application.
    App.command("App:LayoutController:RenderLayout");
    App.command("Navbar:LayoutController:RenderLayout");
    App.command("Map:LayoutController:RenderLayout");

    /*** START ROUTER ***/
    App.command('App:Router:Instantiate');
    Backbone.history.start();
  });

  return App;
});
