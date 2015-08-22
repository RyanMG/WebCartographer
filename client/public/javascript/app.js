define(function(require) {

  var Marionette = require('marionette')
    , router     = require('router')
    , RootView   = require('app_root_view')
    , app        = new Marionette.Application();

  app.rootView = new RootView();
  app.rootView.render();
  app.router = router;

  return app;
});
