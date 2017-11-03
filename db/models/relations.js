const db = require('../db'),
    User = require('./user'),
    Sitter = require('./sitter'),
    Owner = require('./owner'),
    Stay = require('./stay');

Sitter.belongsTo(User);
Owner.belongsTo(User);

module.exports = {
    User,
    Sitter,
    Owner,
    Stay
};