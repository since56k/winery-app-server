// const express           = require('express');
// const router            = express.Router();
// const Product = require('../../models/Product');

// /* GET cart product details. */
// router.get('/:id', (req, res) => {

//   Product
//       .findOne({user_id: req.params.id})
//       .populate("current_cart.productId")
//       .exec((err, product) => {
//         if (err) {
//         res.json(err);
//         return;
//         }
//     res.json(product);

//   });

//   /* PUT Product to Cart. */

// router.put('/add', (req, res) => {
//   var userId = req.body.userId;
//   var item = req.body.cartItem;

  
//   Product.findOneAndUpdate({user_id: userId}, {$push: { "current_cart": item }}, {new: true}, (err, product)=>{
//     console.log(product);
//     res.send(product);
//       }) 
//      }
// });


// module.exports = router;
