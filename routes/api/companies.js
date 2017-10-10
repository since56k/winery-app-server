const express = require('express');
const router = express.Router();
const Company = require('../../models/User');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const upload = require('../../config/multer');

/* GET Companies */
router.get('/', (req, res, next) => {
    Company.find({ role: { "$in": ["Company"] } }, (err, companies) => {
        if (err) { return res.json(err).status(500); }

        return res.json(companies);
    });
});

/* GET certain Company*/
router.get('/:id', (req, res, next) => {
    Company.findById(req.params.id, (err, company) => {
        if (err) { return res.status(500).json(err); }
        if (!company) { return res.status(404).json(new Error("404")) }

        return res.json(company);
    });
});

/* POST new Company. */
router.post('/newcompany', upload.single('file'), function(req, res) {

  const company = new Company({
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
    organic: req.body.organic,
    image: `/uploads/${req.file.filename}` || ''
    
  });

  if (req.body.password) {
      company.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(bcryptSalt));
    }

  company.save((err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'New Company created!',
      company: company
    });
  });
});


/* UPDATE Company */
router.put('/update/:id', (req, res) => {

    const updates = {
        username: req.body.username,
        email: req.body.email,
        organic: req.body.organic,
        password: '',
        website: req.body.website,
    };

    if (req.body.password) {
      updates.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(bcryptSalt));
    }

    Company.findByIdAndUpdate(req.params.id, updates, (err) => {
        if (err) {
            res.json(err);
            return;
        }

        res.json({
            message: 'Company updated successfully'
        });
    });
});

/* DELETE a Company. */
router.delete('/delete/:id', (req, res, next) => {
    const id = req.params.id;

    Company.findByIdAndRemove(id, (err, buyer) => {
        if (err) {
            res.json(err);
            return;
        }
        return res.json({
            message: 'Company has been removed!'
        });
    });
});



module.exports = router;