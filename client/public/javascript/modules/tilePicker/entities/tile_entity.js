define(function(require) {

  var BackBone = require('backbone')
    , _        = require('underscore');

  var TileModel = BackBone.Model.extend({

    defaults: {
      name     : 'No Name',
      texture  : 'Unknown',
      feature  : 'Unknown',
      width    : 0,
      height   : 0,
      src      : 'file:///Users/DrHall/Desktop/gitRepos/WebCartographer/client/public/img/black_default_1x1_01.jpg'
    }

  });

  var TileCollection = BackBone.Collection.extend({

    model: TileModel,

    url: 'http://localhost:8080/tiles',

    parse: function(data) {
      return _.map(data, function(model) {
        return _.omit(model, ['updatedAt', 'createdAt']);
      });
    },

  });

  return TileCollection;
});
