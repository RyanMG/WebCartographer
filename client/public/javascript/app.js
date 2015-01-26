define([], function(){

  var App = new Backbone.Marionette.Application()
   , $appDeferred = new $.Deferred();

  App.promise = $appDeferred.promise();

  Backbone.Marionette.Behaviors.behaviorsLookup = App.Behaviors = {};
  
  require([
     "app/app_all_components"
     ,"toolbar/toolbar_all_components"
     ,"mapGrid/map_all_components"
     ,"dialog/dialog_all_components"
     , "app/app_router"
  ], function( appComponentsPromise, toolbarComponentsPromise, mapComponentsPromise, dialogComponentsPromise ) {
    $.when( appComponentsPromise, toolbarComponentsPromise, mapComponentsPromise, dialogComponentsPromise ).done(function() {
      $appDeferred.resolve();
    });
  });

  App.on("start", function App_start(){

    // Render master Layout for entire application.
    App.command("App:LayoutController:RenderLayout");

    /*** START ROUTER ***/
    App.command('App:Router:Instantiate');
    Backbone.history.start();

    App.command("Navbar:DialogController:showNewMapDialog");
  });

  return App;
});
