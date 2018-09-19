const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan');
const mongoose = require('mongoose')
const Post = require("../models/post");

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/posts');
const db = mongoose.connection;
db.on('err', console.error.bind(console, 'connection error'));
db.once('open', (callback) => {
    console.log('Connection succeeded');
})

// Get all posts
app.get('/posts', (req, res) => {
    Post.find({}, 'title desc', (err, posts) => {
        if (err) console.log(err);
        res.send({ posts })
    }).sort({ _id: -1 })
})

// Add post
app.post('/posts', (req, res) => {
    const db = req.db;
    const title = req.body.title;
    const desc = req.body.desc;
    const new_post = new Post({ title, desc });

    new_post.save(err => {
        if (err)
            console.log(err);
        res.send({
            success: true,
            message: 'Post saved succesfully!'
        })
    })
})

// Get signle post
app.get('/post/:id', (req, res) => {
    const db = req.db;
    Post.findById(req.params.id, 'title desc', (err, post) => {
        if (err) console.log(err);
        res.send(post)
    });
})

// Update a post
app.put('/posts/:id', (req, res) => {
    var db = req.db;
    Post.findById(req.params.id, 'title desc', (error, post) => {
        if (error) { console.error(error); }

        post.title = req.body.title
        post.desc = req.body.desc
        post.save(error => {
            if (error) {
                console.log(error)
            }
            res.send({
                success: true
            })
        })
    })
})


// Delete a post
app.delete('/posts/:id', (req, res) => {
    var db = req.db;
    Post.remove({
        _id: req.params.id
    }, (err, post) => {
        if (err)
            res.send(err)
        res.send({
            success: true
        })
    })
})

app.listen(process.env.PORT || 8081, () => {
    console.log('Server is up on port 8081');
});