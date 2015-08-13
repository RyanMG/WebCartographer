define(function(require) {
  
  var Mn = require('marionette')
    , _  = require('underscore');

  Mn.mergeOptions = function(target, options, mergeOptions) {
    if (!options) { return; }
    _.extend(target, _.pick(options, mergeOptions));
  };
});