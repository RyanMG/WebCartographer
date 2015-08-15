define(function(require) {

  var Mn    = require('marionette')
    , Radio = require('backbone.radio')
    , _     = require('underscore');

  return Mn.ItemView.extend({

    template: "#tile_picker_layout",

    attributes: {
      'data-view-name' : 'tile_picker_layout_view',
    },

    className: 'tile-picker-window closed',

    ui: {
    },

    events: {
    }

  });

});
