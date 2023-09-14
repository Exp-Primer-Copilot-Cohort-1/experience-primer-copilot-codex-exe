// Create web server 
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const port = 3000;
const comments = require('./comments.json');

app.use(bodyParser.json());

// Create route for GET /comments
router.get('/', (req, res) => {
    res.json(comments);
});

// Create route for GET /comments/:id
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const comment = comments.find(comment => comment.id === id);
    if (!comment) res.status(404).send('The comment with the given ID was not found.');
    res.json(comment);
});

// Create route for POST /comments
router.post('/', (req, res) => {
    const comment = {
        id: comments.length + 1,
        content: req.body.content
    };
    comments.push(comment);
    res.json(comment);
});

// Create route for PUT /comments/:id
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const comment = comments.find(comment => comment.id === id);
    if (!comment) res.status(404).send('The comment with the given ID was not found.');

    comment.content = req.body.content;
    res.json(comment);
});

// Create route for DELETE /comments/:id
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const comment = comments.find(comment => comment.id === id);
    if (!comment) res.status(404).send('The comment with the given ID was not found.');

    const index = comments.indexOf(comment);
    comments.splice(index, 1);
    res.json(comment);
});

app.use('/comments', router);

app.listen(port, () => console.log(`Listening on port ${port}...`));