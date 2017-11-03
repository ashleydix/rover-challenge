const Sequelize = require('sequelize'),
    db = new Sequelize('rover', null, null, {
        dialect: 'sqlite',
        storage: './dev.sqlite'
    });

module.exports = db;