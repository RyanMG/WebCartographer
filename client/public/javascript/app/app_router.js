define(function(require) {

  var Marionette    = require('marionette')
    , globalChannel = Backbone.Radio.channel('globalChannel')
    , Router
    , RouterController;

  Router = Marionette.AppRouter.extend({

    appRoutes: {
      '': 'dashboardRoute',
    },

    onRoute: function() {}

  });

  // create controller to store router methods.
  RouterController = Backbone.Marionette.Controller.extend({

    dashboardRoute: function() {},

  });

  return new Router({ controller: new RouterController() });

});
