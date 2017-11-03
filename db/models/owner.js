const Sequelize = require('sequelize'),
    db = require('../db'),
    Owner = db.define('owner', {
        dogs: {
            type: Sequelize.STRING,
            required: true
        }
    }, {
        freezeTableName: true,
        tableName: 'owner',
        indexes: []
    });

module.exports = Owner;