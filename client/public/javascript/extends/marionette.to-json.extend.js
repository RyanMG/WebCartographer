//
// toJsonShim
// Marionette v2.x Views use toJSON for serialization, which isn't
// the intended use of that method. This resolves that problem.
//
define(function(require) {

  var Mn = require('marionette')
    , _  = require('underscore');

  Mn.View.prototype.serializeModel = function(model) {
    model = model || this.model;
    return _.clone(model.attributes);
  };

  Mn.ItemView.prototype.serializeCollection = function(collection) {
    return collection.map(function(model){ return this.serializeModel(model); }, this);
  };
});
