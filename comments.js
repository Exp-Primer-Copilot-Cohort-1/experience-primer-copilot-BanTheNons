// Create a web server
// 1. Handle GET requests to /comments
// 2. Handle GET requests to /comments/:id
// 3. Handle POST requests to /comments
// 4. Handle PUT requests to /comments/:id
// 5. Handle DELETE requests to /comments/:id

var express = require('express')
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var comments = [];
var commentId = 0;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/comments', function(req, res) {
  res.json(comments);
});

app.get('/comments/:id', function(req, res) {
  var comment = _.find(comments, {id: parseInt(req.params.id, 10)});
  res.json(comment || {});
});

app.post('/comments', function(req, res) {
  var comment = req.body;
  commentId++;
  comment.id = commentId;
  comments.push(comment);
  res.json(comment);
});

app.put('/comments/:id', function(req, res) {
  var update = req.body;
  if (update.id) {
    delete update.id;
  }
  var comment = _.findIndex(comments, {id: parseInt(req.params.id, 10)});
  if (!comments[comment]) {
    res.send();
  } else {
    var updatedComment = _.assign(comments[comment], update);
    res.json(updatedComment);
  }
});

app.delete('/comments/:id', function(req, res) {
  var comment = _.findIndex(comments, {id: parseInt(req.params.id, 10)});
  if (!comments[comment]) {
    res.send();
  } else {
    var deletedComment = comments[comment];
    comments.splice(comment, 1);
    res.json(deletedComment);
  }
});

app.listen(3000, function() {
  console.log('Listening on port 3000');
});