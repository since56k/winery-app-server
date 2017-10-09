const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');
const upload = require('../../config/multer');

/* GET all database products*/
router.get('/', (req, res, next) => {
    Product.find({}, (err, product) => {
        if (err) { return res.json(err).status(500); }
        return res.json(product);
    });
});

/* GET products refered a specific Company*/
router.get('/myproducts/:company', (req, res, next) => {
        Product.find({ 'userId': req.params.company })
        .exec((err, product) => {
            if (err) {
              res.json(err);
              return;
            }
        console.log(product)
        res.json(product);
        });
});

/* POST new Product for specific Company */
router.post('/newproduct', upload.single('file'), (req, res) => {

    const product = new Product({
        name: req.body.name,
        category: req.body.category,
        type: req.body.type,
        userId: req.body.userId,
        image: `/uploads/${req.file.filename}` || ''
    });
    product.save((err) => {
        if (err) {
            
            res.json(err);
            return;
        }

        return res.json({
            message: 'New product created!',
            product: product
        });
    });
});

/* UPDATE product */
router.put('/update/:id', (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    const updates = {
        name: req.body.name,
        category: req.body.category,
        type: req.body.type,
        image: `/uploads/${req.file.filename}` || ''
    };

    Product.findByIdAndUpdate(req.params.id, updates, (err) => {
        if (err) {
            res.json(err);
            return;
        }

        res.json({
            message: 'Product updated successfully'
        });
    });
});

/* DELETE a Product. */
router.delete('/delete/:id', (req, res, next) => {
    const id = req.params.id;

    Product.findByIdAndRemove(id, (err, buyer) => {
        if (err) {
            res.json(err);
            return;
        }
        return res.json({
            message: 'Product has been removed!'
        });
    });
});





module.exports = router;