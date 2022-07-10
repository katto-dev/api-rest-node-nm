const express = require('express');

const router = express.Router();

// Con Params
// http://localhost:3000/categories/555/products/2222
router.get('/:categoryId/products/:productId', (req, res) => {
    const { categoryId, productId } = req.params;
    res.json({
        categoryId,
        productId
    })
});

module.exports = router;
