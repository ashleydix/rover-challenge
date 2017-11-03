const Sequelize = require('sequelize'),
    db = require('../db'),
    Sitter = db.define('sitter', {
        score: {
            type: Sequelize.DECIMAL,
            required: true
        },
        rating: {
            type: Sequelize.DECIMAL,
            required: true
        },
        rank: {
            type: Sequelize.DECIMAL,
            required: true
        }
    }, {
        freezeTableName: true,
        tableName: 'sitter',
        indexes: []
    });

module.exports = Sitter;