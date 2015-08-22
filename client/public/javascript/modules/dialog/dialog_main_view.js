define(function(require) {
  
  return Mn.ItemView.extend({

    template: '#dialog_template',

    className: 'dialog',

    initialize: function initialize() {
      this.addToBabySitter();
    },

    ui: {
      form: 'form',
      submitBtn: '#submitDialog'
    },

    events: {
      'click @ui.submitBtn': 'onSubmitBtnClick'
    },

    onSubmitBtnClick: function onSubmitBtnClick(evt) {
      evt.preventDefault();
      var newMapOptions = {
          height  : this.ui.form.find('[name='sizeHeight']').val()
        , width   : this.ui.form.find('[name='sizeWidth']').val()
        , texture : this.ui.form.find('[name='background']').val()
      };

      App.command('Navbar:DialogController:hideMapDialog');
      App.command('App:MainController:buildNewMap', newMapOptions);
    },

    addToBabySitter: function addToBabySitter() {
      AppLayoutBabySitter.add(this, 'BabySitter:App:AppLayout:DialogLayout');
    },

    onDestroy: function onDestroy() {
      AppLayoutBabySitter.remove(this);
    }
  });

});
