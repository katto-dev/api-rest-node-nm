const express = require('express');
const ProductsService = require('../services/products.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/products.schema');


const router = express.Router();
const service = new ProductsService();

// READ
// http://localhost:3000/products?size=3
router.get('/', async (req, res) => {
    const products = await service.find();
    res.json(products);
});

// Productos --> Tener cuidado con el endpoint "/products/:id"
// el "filter" lo toma como un Id
// los endpoints especificos deben ir antes de los endpoints dinámicos
router.get('/filter', (req, res) => {
    res.send('Yo soy un filter');
});

// READ
// Con Params
// http://localhost:3000/products/12
router.get('/:id',
    validatorHandler(getProductSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await service.findOne(id);
            res.json(product);
        } catch (error) {
            next(error);
        }
    }
);

// CREATE
router.post('/',
    validatorHandler(createProductSchema, 'body'),
    async (req, res) => {
        const body = req.body;
        const newProduct = await service.create(body);
        res.status(201).json(newProduct);
    }
);

// UPDATE
// router.put('/:id', async (req, res) => {
//     const { id } = req.params;
//     const body = req.body;

//     res.json({
//         message: 'Updated product',
//         data: body,
//         id
//     });
// });

// UPDATE PARTIAL
router.patch('/:id',
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const product = await service.update(id, body);
            res.json(product);
        } catch (error) {
            next(error);
        }
    }
);

// DELETE
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
});

module.exports = router;
