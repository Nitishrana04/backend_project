const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidv4 }=require('uuid');
const methodOverride = require('method-override')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

let comments = [
    {
        id: 1,
        username: 'NITISH',
        text: 'good product'
    },
    {
        id: 2,
        username: 'jaat',
        text: 'good product'
    },
    {
        id: 3,
        username: 'rana',
        text: 'good product'
    }
];

app.get('/', (req, res) => {
    res.send('Working fine');
});

app.get('/comments', (req, res) => {
    res.render('index', { comments });
});

app.get('/comments/new', (req, res) => {
    res.render('new');
});

app.post('/comments', (req, res) => {
    const { username, text } = req.body;
    comments.push({ id: comments.length + 1, username, text });
    res.redirect('/comments'); 
});

app.get('/comments/:commentId', (req, res) => {
    const commentId = parseInt(req.params.commentId); 

    const foundComment = comments.find((Comment) => Comment.id === commentId);

    if (foundComment) {
        res.render('show', { comment: foundComment });
    } else {
        res.status(404).send('Comment not found');
    }
});

app.get('/comments/:commentId/edit', (req, res) => {
    const commentId = parseInt(req.params.commentId); 

    const foundComment = comments.find((comment) => comment.id === commentId);

    if (foundComment) {
        res.render('edit', { comment: foundComment }); 
    } else {
        res.status(404).send('Comment not found');
    }
});


app.patch('/comments/:commentId', (req, res) => {
    const commentId = parseInt(req.params.commentId);
    const { username, text } = req.body;

    const foundComment = comments.find((comment) => comment.id === commentId);

    if (foundComment) {
        
        foundComment.username = username;
        foundComment.text = text;
        res.redirect(`/comments/${commentId}`);
    } else {
        res.status(404).send('Comment not found');
    }
});

app.delete('/comments/:commentId', (req, res) => {
    const commentId = parseInt(req.params.commentId);

    
    const commentIndex = comments.findIndex((comment) => comment.id === commentId);

    if (commentIndex !== -1) {
        
        comments.splice(commentIndex, 1);
        res.redirect('/comments');
    } else {
        
        res.status(404).send('Comment not found');
    }
});



app.listen(5000, () => {
    console.log('Server is up at Port', 5000);
});
