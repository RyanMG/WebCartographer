define([], function(){

  "use strict";

  var App = new Backbone.Marionette.Application()
   , $appDeferred = new $.Deferred();

  App.promise = $appDeferred.promise();

  window.App = App;

  require([
     "app/app_all_components"
     ,"navbar/navbar_all_components"
     ,"pictureTaker/picture_all_components"
     , "app/app_router"
  ], function( appComponentsPromise, navBarComponentsPromise, pictureTakerComponentsPromise ) {
    $.when(
        appComponentsPromise,
        navBarComponentsPromise,
        pictureTakerComponentsPromise
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
    App.command("Navbar:LayoutController:RenderLayout");
    App.command("PictureTaker:LayoutController:RenderLayout");
    /*** START ROUTER ***/
    App.command('App:Router:Instantiate');
    Backbone.history.start();

    App.command("PictureTaker:MainController:InitializeVideo");
  });

  return App;
});
