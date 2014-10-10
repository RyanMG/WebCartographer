define([
  "app"
], function( App ) {

  // Create main Router
  var Router = Backbone.Marionette.AppRouter.extend({

    initialize: function initialize() {
    },

    appRoutes: {
      '': 'dashboardRoute',
      'expenses/:type(/:id)(/)': 'expenseSummaryRoute',
      'expense/:type(/:id)(/)(:focus)(/)(:lineitemId)(/)': 'expenseReportRoute',
      '*actions(/)': 'unknownRoute'
    },

    beforeRoute: function beforeRoute() {
    },

    onRoute: function onRoute() {
    }

  });

  // create controller to store router methods.
  var RouterController = Backbone.Marionette.Controller.extend({

    initialize: function initialize(options){},

    dashboardRoute: function dashboardRoute() {
    },

    expenseSummaryRoute: function expenseSummaryRoute(listType, id) {
    },

    expenseReportRoute: function expenseReportRoute(type, id, focus, lineitemId) {
    },

    unknownRoute: function unknownRoute() {
    }
  });

  // have router initialize itself in scope variable.
  var router;

  App.comply('App:Router:Instantiate', function instantiateAppRouter() {
    // store router instance in scope variable.
    router = new Router(
      {
        // required parameter
        controller: new RouterController()
      }
    );
  });

  return Router;
});