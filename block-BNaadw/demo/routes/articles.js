var express = require('express');
var router = express.Router();
const Article = require('../models/Article');
const Comment = require('../models/Comment');

//articles list
router.get('/', (req, res, next) => {
  if (req.session.userId) {
    Article.find({}, (err, articles) => {
      if (err) return next(err);
      res.render('articleList', { articles });
    });
  } else {
    return res.redirect('/users/login');
  }
});

//form
router.get('/new', (req, res) => {
  if (req.session.userId) {
    return res.render('articleform');
  } else {
    return res.redirect('/users/login');
  }
});

//capture the form data
router.post('/new', (req, res, next) => {
  Article.create(req.body, (err, articles) => {
    if (err) return next(err);
    res.redirect('/articles');
  });
});

// router.get('/:id', (req, res, nexxt) => {
//   let id = req.params.id;
//   Article.find({}, (err, articles) => {
//     if (err) return next(err);
//     res.render('articleDetails', { articles });
//   });
// });

router.post('/:id/comments', (req, res, next) => {
  let id = req.params.id;
  req.body.articleId = id;
  Comment.create(req.body, (err, comment) => {
    Article.findByIdAndUpdate(
      id,
      { $push: { comment: comment.id } },
      (err, articles) => {
        if (err) return next(err);
        res.redirect('/articles/' + id);
      }
    );
  });
});

// comment  populate

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Article.findById(id)
    .populate('comment')
    .exec((err, articles) => {
      if (err) return next(err);
      res.render('articleDetails', { articles });
    });
});

// likes
router.get('/:id/likes', (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, events) => {
    if (err) return next(err);
    res.redirect('/articles/' + id);
  });
});

//   dislikes

router.get('/:id/dislikes', (req, res, next) => {
  let id = req.params.id;
  Article.findById(id, (err, articles) => {
    if (articles.likes > 0) {
      Article.findByIdAndUpdate(
        id,
        {$inc: {likes: -1 } },
        (err, articles) => {
          if (err) return next(err);
          res.redirect('/articles/' + id);
        }
      );
    }
  });
});

module.exports = router;
