const Sequelize = require('sequelize'),
    db = require('../db'),
    User = db.define('user', {
        name: {
            type: Sequelize.STRING,
            required: true
        },
        email: {
            type: Sequelize.STRING,
            required: true
        },
        phone: {
            type: Sequelize.STRING,
            required: true
        },
        image: {
            type: Sequelize.STRING,
            required: true
        }
    }, {
        freezeTableName: true,
        tableName: 'user',
        indexes: [{
                fields: ['email']
            },
            {
                fields: ['createdAt']
            }
        ]
    });

module.exports = User;