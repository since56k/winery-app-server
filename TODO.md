user model
- add location
  location   : { type: {type:String}, coordinates: [Number]},


  /auth/login/:role

	User.find({{username: req.body.username, role: req.params.role})