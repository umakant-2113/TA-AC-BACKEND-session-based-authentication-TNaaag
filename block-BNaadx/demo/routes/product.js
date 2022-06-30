let express = require('express');
let router = express.Router();
let fs = require('fs');
let Product = require('../models/Product');
let Comment = require('../models/Comment');
let multer = require('multer');
let path = require('path');
let uploadPath = path.join(__dirname, '../', 'public/images');
// multer use
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

var upload = multer({ storage: storage });
// render form about of product
router.get('/new', (req, res, next) => {
  res.render('product');
});

// All products
router.get("/list",(req,res,next)=>{
Product.find({},(err,products)=>{
    if(err) return next(err);
    res.render("allproduct",{products})
})
})

// capture the data product

router.post('/new', upload.single('image'), (req, res, next) => {
  req.body.image = req.file.filename;
  Product.create(req.body, (err, products) => {
    if (err) return next(err);
    res.redirect('/products');
  });
});
// product list
router.get('/', (req, res, next) => {
  let id = req.params.id;
  Product.find({}, (err, products) => {
    if (err) return next(err);
    res.render('productlist', { products });
  });
});


router.post('/:id/comments', (req, res, next) => {
  let id = req.params.id;
  req.body.productId = id;
  Comment.create(req.body, (err, comments) => {
    Product.findByIdAndUpdate(
      id,
      { $push: { comment: comments.id } },
      (err, products) => {
        if (err) return next(err);
        console.log(products);
        res.redirect('/products/' + id + '/details');
      }
    );
  });
});

// popolate

router.get('/:id/details', (req, res, next) => {
  let id = req.params.id;
  Product.findById(id)
    .populate('comment')
    .exec((err, products) => {
      if (err) return next(err);
      res.render('product-details', { products });
    });
});

// like by the use

router.get('/:id/likes', (req, res, next) => {
  let id = req.params.id;
  Product.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, products) => {
    if (err) return next(err);
    res.redirect('/products/' + id + '/details');
  });
});

// dislikes
router.get('/:id/dislikes', (req, res, next) => {
  let id = req.params.id;
  Product.findById(id, (err, products) => {
    if (products.likes > 0) {
      Product.findByIdAndUpdate(
        id,
        { $inc: { likes: -1 } },
        (err, products) => {
          if (err) return next(err);
          res.redirect('/products/' + id + '/details');
        }
      );
    }
  });
});
// edit product page

router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id;
  Product.findById(id, (err, products) => {
    if (err) return next(err);
    res.render('product-update', { products });
  });
});

// capture data

router.post('/:id/edit', upload.single('image'), (req, res, next) => {
  let id = req.params.id;
  let newImage = '';
  if (req.file) {
    newImage = req.file.filename;
    try {
      //delete the old image
      fs.unlinkSync('./public/images/' + req.body.image);
    } catch (error) {
      console.log(error);
    }
  } else {
    newImage = req.body.image;
  }
  req.body.image = newImage;
  Product.findByIdAndUpdate(id, req.body, (err, product) => {
    if (err) return next(err);
    res.redirect('/products/' + id + '/details');
  });
});

// delete products

router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id;
  Product.findByIdAndDelete(id, (err, products) => {
    if (err) return next(err);
    res.redirect('/products');
  });
});

// update comments 



module.exports = router;
