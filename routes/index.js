var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/posts', function(req, res, next) {
  console.log("in index.js server get");
  Post.find(function(err, posts){
    if(err){ return next(err); }

    res.json(posts);
  });
});

router.get('/posts/:title', function(req, res, next) {
  var param_title = req.params.title;
  console.log(param_title);
  Post.find({'title':param_title}, '-_id -__v',
            function(err, post){
              if(err){ return next(err);}
              console.log(post);
              res.json(post);
  });

});


router.post('/posts', function(req, res, next) {
  var post = new Post(req.body);

  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
});

module.exports = router;