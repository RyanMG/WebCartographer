define(function(require) {

  var Mn    = require('marionette')
    , Radio = require('backbone.radio')
    , Router
    , RouterObject;

  Router = Mn.AppRouter.extend({

    appRoutes: {
      '': 'homeRoute',
    },

    onRoute: function() {}

  });

  // create controller to store router methods.
  RouterObject = Mn.Object.extend({

    homeRoute: function() {
      Radio.request('rootView', 'show:mainView');
    }

  });

  return new Router({ controller: new RouterObject() });

});
