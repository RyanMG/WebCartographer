define(function(require) {

  var Marionette = require('marionette')
    , Radio      = require('backbone.radio')
    , _          = require('underscore');
 
  /**
   * Applications create a Channel when being instantiated.
   * Ref: https://github.com/marionettejs/backbone.marionette/blob/master/src/application.js#L13
   * However, they create a channel using the Wreqr API. This 'shim' overrides
   * the channel initialization method to use Radio instead. Because of this, Wreqr no
   * longer needs to be shipped with Marionette.
   * 
   * The channel used by the Application is specified by the `app#channelName` property,
   * defaulting to 'global.''
   * 
   */
  Marionette.Application.prototype._initChannel = function () {

    // Get the name of the channel to create.
    this.channelName = _.result(this, 'channelName') || 'global';

    // Attach it to the application. In general, you should not need to reference this
    // property from outside the application instance itself. Other objects can use
    // the Radio API to access the same given via `Radio.channel('channelName');`
    this.channel = _.result(this, 'channel') || Radio.channel(this.channelName);

    // Lastly, attach the channel's methods to the Application, allowing quick
    // access to, say, the `request` method for instance. This lets one do:
    //
    // App.request('my:request');
    // 
    // for backwards compatibility.
    _.extend(this, this.channel);
  };
});
