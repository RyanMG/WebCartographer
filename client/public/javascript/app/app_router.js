define([
  "app"
], function( App ) {

  // Create main Router
  var Router = Backbone.Marionette.AppRouter.extend({

    initialize: function initialize() {
    },

    appRoutes: {
      '': 'dashboardRoute',
    },

    onRoute: function onRoute() {
    }

  });

  // create controller to store router methods.
  var RouterController = Backbone.Marionette.Controller.extend({

    initialize: function initialize(options){},

    dashboardRoute: function dashboardRoute() {
    },

  });

  var router;

  App.comply('App:Router:Instantiate', function instantiateAppRouter() {
    // store router instance in scope variable.
    router = new Router({
      // required parameter
      controller: new RouterController()
    });
  });

  return Router;
});