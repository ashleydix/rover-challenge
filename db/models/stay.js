const Sequelize = require('sequelize'),
    db = require('../db'),
    Stay = db.define('stay', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rating: {
            type: Sequelize.INTEGER,
            required: true
        },
        startDate: {
            type: Sequelize.DATEONLY,
            required: true
        },
        endDate: {
            type: Sequelize.DATEONLY,
            required: true
        },
        sitterId: {
            type: Sequelize.INTEGER,
            required: true
        },
        ownerId: {
            type: Sequelize.INTEGER,
            required: true
        }
    }, {
        freezeTableName: true,
        tableName: 'stay',
        indexes: [{
            unique: true,
            fields: ['startDate', 'endDate', 'sitterId', 'ownerId', 'rating']
        }]
    });

module.exports = Stay;