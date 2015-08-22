var Sequelize = require('sequelize');
var sequelize = new Sequelize('webCartographer', 'root', 'sqlize404', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var Tile = sequelize.define('tile', {
  name    : Sequelize.STRING,
  height  : Sequelize.INTEGER,
  width   : Sequelize.INTEGER,
  texture : Sequelize.STRING,
  src     : Sequelize.STRING
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

// Tile.sync({force: true}).then(function () {
//   // Table created
//   return Tile.create({
//     name    : 'Black Pit',
//     height  : 2,
//     width   : 4,
//     texture : 'stone',
//     src     : './img/black_pit_2x4_01.jpg'
//   });
// });

module.exports = Tile;
