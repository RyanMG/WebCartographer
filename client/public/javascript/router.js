define(function(require) {

  var Marionette    = require('marionette')
    , Radio         = require('backbone.radio')
    , Router
    , RouterController;

  Router = Marionette.AppRouter.extend({

    appRoutes: {
      '': 'homeRoute',
    },

    onRoute: function() {}

  });

  // create controller to store router methods.
  RouterController = Marionette.Object.extend({

    homeRoute: function() {
      var app         = require('app')
        , toolbarView = require('modules/toolbar/toolbar_layout_view')

      Radio.request('rootView', 'show:toolbar', toolbarView);
    }

  });

  return new Router({ controller: new RouterController() });

});
