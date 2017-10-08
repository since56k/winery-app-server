const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');
const upload = require('../../config/multer');

/* GET products */
router.get('/', (req, res, next) => {
    Product.find({}, (err, product) => {
        if (err) { return res.json(err).status(500); }

        return res.json(product);
    });
});

router.get('/:id', (req, res, next) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) { return res.status(500).json(err); }
        if (!product) { return res.status(404).json(new Error("404")) }

        return res.json(product);
    });
});

/* POST new Product. */
router.post('/newproduct', upload.single('file'), (req, res) => {
    const product = new Product({
        name: req.body.name,
        category: req.body.category,
        type: req.body.type,
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