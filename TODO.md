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