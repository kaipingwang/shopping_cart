const express = require('express');
const csrf = require('csurf');
const csrfProtection = csrf();
const passport = require('passport');
const router = express.Router();
const Product =require('../models/products');
const Cart = require('../models/cart');
const Order = require('../models/order');

router.get('/user/profile', isLoggedIn, function (req, res, next) {
    Order.find({user: req.user}, function(err, orders) {
        if (err) {
            return res.write('Error!');
        }
        var cart;
        orders.forEach(function(order) {
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('user/profile', { orders: orders});
    });
});

router.get('/user/about', isLoggedIn, function (req, res, next) {
    Order.find({user: req.user}, function(err, orders) {
        if (err) {
            return res.write('Error!');
        }
        var cart;
        orders.forEach(function(order) {
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('user/about', { orders: orders});
    });
});

router.get('/user/logout', isLoggedIn, function (req, res, next) {
    req.logout();
    res.redirect('/');
});
router.get('/', function(req, res, next) {
  var successMsg = req.flash('success')[0];
  let products = Product.find((err,docs)=>{
  let productChunks =[];
  let chunksize =3;
  for(let i =0; i<docs.length; i+=chunksize){
    productChunks.push(docs.slice(i,i+chunksize));
  }
  //console.log(req.session.cart);
      res.render('shop/index', {title: 'Shopping Cart', products: productChunks, successMsg: successMsg, noMessages: !successMsg});
  });

});

router.get('/reduce/:id', function(req, res, next) {
    if (!req.session.cart) {
        return res.render('shop/shopping-cart', {products: null});
    }
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reducedByOne(productId);
        req.session.cart = cart;
        res.redirect('/shopping-cart');

});

router.get('/remove/:id', function(req, res, next) {
    if (!req.session.cart) {
        return res.render('shop/shopping-cart', {products: null});
    }
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(productId);
        req.session.cart = cart;
        res.redirect('/shopping-cart');

});




router.get('/add-to-cart/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product) {
       if (err) {
           return res.redirect('/');
       }
        cart.add(product, product.id);
        req.session.cart = cart;

        res.redirect('/');
    });
});


router.get('/preview/:id', function(req, res, next) {
  let productId = req.params.id;

  Product.findById(productId, function(err, product) {
     if (err) {
         return res.redirect('/');
     }
     res.render('shop/preview',{ product_detail: product});

  });


});


router.get('/shopping-cart', function(req, res, next) {
   if (!req.session.cart) {
       return res.render('shop/shopping-cart', {products: null});
   }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout', isSignIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

router.post('/checkout', function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);

    var stripe = require("stripe")(
        "sk_test_veAD4mGQXHmqJM3w2Mwwf0wr"
    );

    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "usd",
        source: req.body.token, // obtained with Stripe.js
        description: "Test Charge"
    }, function(err, charge) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/checkout');
        }
        var order = new Order({
                  paymentId: charge.id,
                  user: req.user,
                  name: charge.source.name,
                  phone: req.body.phone,
                  address: req.body.address,
                  amount: charge.amount,
                  cart: cart,
                  address_zip: charge.source.address_zip
              });

              order.save(function(err, result) {
                if(err){
                  console.log(err)
                }
                req.flash('success', 'Successfully bought product!');
                req.session.cart = null;
                res.send('success');
              });
    });

});




router.use(csrfProtection);
router.use('/', notLoggedIn, function (req, res, next) {
    next();
});

router.get('/user/signup', (req, res, next) =>{
  let messages = req.flash('error');
  res.render('user/signup', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0})
});



router.post('/user/signup', passport.authenticate('local.signup', {
    failureRedirect: '/user/signup',
    failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profile');
    }
});


router.get('/user/signin', (req, res, next) =>{
  let messages = req.flash('error');
  res.render('user/signin', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0})
});



router.post('/user/signin', passport.authenticate('local.signin', {
    failureRedirect: '/user/signin',
    failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profile');
    }
});






module.exports = router;
function isSignIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('user/signin');
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
