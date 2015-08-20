define(function(require) {

  var Mn    = require('marionette')
    , Radio = require('backbone.radio')
    , _     = require('underscore');

  return Mn.ItemView.extend({

    template: "#settings_layout",

    attributes: {
      'data-view-name' : 'settings_item_view',
    },

    className: 'settings',

    ui: {
      'opacityInput'   : '#grid-opacity',
      'opacityText'    : '.opacity-text',
      'languageSelect' : '#language'
    },

    events: {
      'change @ui.opacityInput' : 'onOpacityChange'
    },

    sliderPosition: [3, 32, 60, 89, 118, 147, 174, 203, 231, 260, 282],

    initialize: function(options) {
      this.addListeners();
    },

    onRender: function() {
      this.onOpacityChange();
    },

    addListeners: function() {
      Radio.reply('settingsView', 'toggleSettingsOpen', this.toggleSettingsOpen, this);
    },

    toggleSettingsOpen: function() {
      this.$el.toggleClass('open');
    },

    onOpacityChange: function(evt) {
      var rawNumber  = this.ui.opacityInput.val()
        , newOpacity = rawNumber / 10
        , offset     = this.sliderPosition[rawNumber];

      this.ui.opacityText.text(rawNumber).css({
        'padding-left': offset + 'px'
      });
      Radio.request('gridView', 'updateGridOpacity', newOpacity);
    }

  });

});
