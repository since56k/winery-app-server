user model
- add location
  location   : { type: {type:String}, coordinates: [Number]},


  /auth/login/:role

	User.find({{username: req.body.username, role: req.params.role})


	//set manual Header
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });


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

/* PUT Product to Cart. */

// router.put('/addToCart', (req, res) => {
//   var userId = req.body.userId;
//   var item = req.body.cartItem;

//   console.log(req.body.cartItem)
  
//   Behaviour.findOneAndUpdate({user_id: userId}, {$push: { "current_cart": item }}, {new: true}, (err, behaviour)=>{
//     res.send(behaviour)
//       }) 
//      }
//   )

// collection.findByIdAndUpdate(
//     1,
//     {$push: {items: item}},
//     {safe: true, upsert: true},
//     function(err, model) {
//         console.log(err);
//     }
// );


