const express = require('express');
const router = express.Router();
const Buyer = require('../../models/User');
const UserAction = require('../../models/UserAction');
const Product = require('../../models/Product');
const upload = require('../../config/multer');

/* GET Buyers */
router.get('/', (req, res, next) => {
  
  Buyer.find({role: { "$in" : ["Buyer"]}}, (err, buyers) => {
    console.log(res)
    if (err) { return res.json(err).status(500); }

    return res.json(buyers);
  });
});

router.get('/:id', (req, res, next) => {
  Buyer.findById(req.params.id, (err, buyer) => {
    if (err) { return res.status(500).json(err); }
    if (!buyer) { return res.status(404).json(new Error("404")) }

    return res.json(buyer);
  });
});


/* CREATE a new Buyer. */
router.post('/newbuyer', upload.single('file'), function(req, res) {
  const buyer = new Buyer({
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
    image: `/uploads/${req.file.filename}` || ''
    
  });

  buyer.save((err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'New Buyer created!',
      buyer: buyer
    });
  });
});
  

/* PUT update buyer */
router.put('/update/:id', (req, res) => {
  
    const updates = {
      username: req.body.username,
      email: req.body.email,
      role: req.body.role
    };

    console.log(updates)
    
    Buyer.findByIdAndUpdate(req.params.id, updates, (err) => {
      if (err) {
        res.json(err);
        return;
      }
  
      res.json({
        message: 'Buyer updated successfully'
      });
    });
  })
  

/* DELETE a Buyer. */
router.delete('/delete/:id', (req, res, next) => {
    const id = req.params.id;

    Buyer.findByIdAndRemove(id, (err, buyer) => {
        if (err) {
            res.json(err);
            return;
        }
        return res.json({
            message: 'Buyer has been removed!'
        });
    });
});

/* CART */

// /* GET cart product details. */
// router.get('/cart/:id', (req, res) => {
//   Buyer
//       .findOne({user_id: req.params.id})
//       .populate("current_cart.productId")
//       .exec((err, product) => {
//         if (err) {
//           res.json(err);
//         return;
//         }
//       res.json(product);

//   });


// /* PUT update buyer */
// router.put('/add/:id', (req, res) => {
  
//     console.log('testtest', req, res)
//     Buyer.findByIdAndUpdate(req.params.id, req.body.name, (err) => {
//       if (err) {
//         res.json(err);
//         return;
//       }
  
//       res.json({
//         message: 'Buyer updated successfully'
//       });
//     });
//   })


router.put('/add/:id', (req, res) => {
    console.log('test')
    var userId = req.params.id;
    
   const updates = {
      current_cart: req.body.name,
    };

  
  Buyer.findByIdAndUpdate(req.params.id, updates, (err) => {
     if (err) {
      res.json(err);
      console.log(err)
      return;
    }
    res.json({
      message: 'Cart updated successfully'
      });
    });
  });


module.exports = router;
