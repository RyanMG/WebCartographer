define(function(require) {

  var Marionette = require('marionette')
    , router     = require('router')
    , app        = new Marionette.Application()
    , rootView   = require('app_root_view');

  app.rootView = new rootView();
  app.rootView.render();
  app.router = router;

  return app;
});
