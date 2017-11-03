const relations = require('../db/models/relations');

function all(req, res) {
    relations.Sitter.findAll({
        where: {},
        include: { model: relations.User },
        order: [
            ['rank', 'DESC']
        ]
    }).then(sitters => {
        res.json({ sitters: sitters });
    }).error(err => {
        res.status(500);
        res.json({ msg: 'Error', error: err, sitters: [] });
    });
}

module.exports = {
    all
};