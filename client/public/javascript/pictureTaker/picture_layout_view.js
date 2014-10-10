define([
  "app"
  , "babysitter/app_layout_babysitter"
],function(App, AppLayoutBabySitter){

  App.PictureTaker.Views.PictureTakerLayout = Backbone.Marionette.LayoutView.extend({

    id: "picture-taker-layout-view",

    className: "",

    template: "#picture_taker_layout",

    regions: {},

    ui: {
      imagePreview: '#image-preview',
      imageTakerBtn: '#image-taker',
      imageText: '#image-text'
    },

    events: {
      'click @ui.imageTakerBtn': 'takePicture'
    },

    initialize: function initialize() {
      this.addToBabySitter();
    },

    takePicture: function takePicture(evt) {
      !!evt && evt.preventDefault();
      context.drawImage(video, 0, 0, 640, 480);
    },

    addToBabySitter: function addToBabySitter() {
      AppLayoutBabySitter.add(this, "BabySitter:App:AppLayout:PictureTakerLayout");
    }

  });

  return App.PictureTaker.Views.PictureTakerLayout;
});