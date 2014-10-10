define([], function(){

  "use strict";

  var App = new Backbone.Marionette.Application()
   , $appDeferred = new $.Deferred();

  App.promise = $appDeferred.promise();

  require([
     "app/app_all_components"
     , "app/app_router"
  ], function( appComponentsPromise ) {
    $.when(
        appComponentsPromise
    ).done(function() {
      // all necessary module definitions have loaded.
      $appDeferred.resolve();
    });
  });

  // Listeners
  // =================

  App.on("start", function App_start(){

    // Render master Layout for entire application.
    App.command("App:LayoutController:RenderLayout");
    /*** START ROUTER ***/
    App.command('App:Router:Instantiate');
    Backbone.history.start();

  });

  return App;
});
