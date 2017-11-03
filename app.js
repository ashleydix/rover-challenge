const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    index = require('./controllers'),
    sitter = require('./controllers/sitter'),
    port = process.env.PORT || 5000,
    app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', index.index);
app.get('/sitters', sitter.all);

app.listen(port, () => {
    console.log('Server started:', 'http://localhost:' + port);
});