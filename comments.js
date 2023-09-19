// Create web server application
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/comments');
var Comment = require('./models/comment');
var router = express.Router();

// Middleware to use for all requests
router.use(function(req, res, next) {
    console.log('Something is happening.');
    next(); // Go to next route
});

// Test route to make sure everything is working
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// Routes that end in /comments
router.route('/comments')
    // Create a comment (POST http://localhost:8080/api/comments)
    .post(function(req, res) {
        var comment = new Comment(); // Create a new instance of the comment model
        comment.name = req.body.name; // Set the comment name (comes from the request)
        comment.comment = req.body.comment; // Set the comment comment (comes from the request)
        comment.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Comment created!' });
        });
    })
    // Get all the comments (GET http://localhost:8080/api/comments)
    .get(function(req, res) {
        Comment.find(function(err, comments) {
            if (err)
                res.send(err);
            res.json(comments);
        });
    });

// Routes that end in /comments/:comment_id
router.route('/comments/:comment_id')
    // Get the comment with that id (GET http://localhost:8080/api/comments/:comment_id)
    .get(function(req, res) {
        Comment.findById(req.params.comment_id, function(err, comment) {
            if (err)
                res.send(err);
            res.json(comment);
        });
    })
    // Update the comment with that id (PUT http://localhost:8080/api/comments/:comment_id)
    .put(function(req, res) {
        Comment.findById(req.params.comment_id, function(err, comment) {
            if (err)
                res.send(err);
            comment.name = req.body.name; // Update the comment name
            comment.comment = req.body.comment; // Update the comment comment
            comment.save(function(err) {
                if (err)