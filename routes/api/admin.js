const express           = require('express');
const router            = express.Router();
const Admin             = require('../../models/Admin');

//get all admin

router.get('/', (req, res, next) => {
  Admin.find({}, (err, admin) => {
    console.log(res)
    if (err) { return res.json(err).status(500); }

    return res.json(admin);
  });
});

router.get('/:id', (req, res, next) => {
  Admin.findById(req.params.id, (err, admin) => {
    if (err)         { return res.status(500).json(err); }
    if (!admin)      { return res.status(404).json(new Error("404")) }

    return res.json(admin);
  });
});


  //Post new admin
router.post('/newadmin', (req, res, next) => {
    const Admin = new Admin({
      name: req.body.name,
      desc: req.body.desc,
      specs: req.body.specs,
      image: req.body.image || ''
    });
  
    Admin.save((err) => {
      if (err) {
        res.json(err);
        return;
      }
  
      res.json({
        message: 'New admin created!',
        id: Admin._id
      });
    });
  });
  

  //Update save admin
router.put('/update/:id', (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    const updates = {
      name: req.body.name,
      desc: req.body.desc,
      specs: req.body.specs,
      image: req.body.image
    };
    
    Admin.findByIdAndUpdate(req.params.id, updates, (err) => {
      if (err) {
        res.json(err);
        return;
      }
  
      res.json({
        message: 'Admin updated successfully'
      });
    });
  })
  
//Delete
/* DELETE a Admin. */
router.delete('/delete/:id', (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
    
    Admin.remove({ _id: req.params.id }, (err) => {
      if (err) {
        res.json(err);
        return;
      }
  
      return res.json({
        message: 'Admin has been removed!'
      });
    })
  });

module.exports = router;
