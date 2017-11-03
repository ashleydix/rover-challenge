function index(req, res) {
    res.render('index', { title: 'Rover - Sitter' });
}

module.exports = {
    index
};