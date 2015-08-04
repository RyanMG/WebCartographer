require([
  'require-config'
], function(config) {

  'use strict';

  require([
    'app',
    'app/app_layout_view',
    'extends/marionette.radio.extend'
  ], function(app, appLayout) {

    var globalChannel = Backbone.Radio.channel('global')

    app.rootView = new appLayout();
    app.rootView.render();
    app.start();

    Backbone.history.start();

  });

});
