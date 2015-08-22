define(function(require) {

  var Mn = require('marionette');

  return Mn.ItemView.extend({

    template: '#dialog_template',

    className: 'dialog',

    initialize: function() {},

    ui: {
      form: 'form',
      submitBtn: '#submitDialog'
    },

    events: {
      'click @ui.submitBtn': 'onSubmitBtnClick'
    },

    onSubmitBtnClick: function(evt) {
      evt.preventDefault();
    }
  });

});
