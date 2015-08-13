define(function(require) {

  var Marionette = require('marionette')
    , router     = require('router')
    , rootView   = require('app_root_view')
    , app        = new Marionette.Application();

  app.rootView = new rootView();
  app.rootView.render();
  app.router = router;

  return app;
});
