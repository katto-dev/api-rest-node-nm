const express = require('express');
const faker = require('faker');

const router = express.Router();

// Con Query Params
// http://localhost:3000/users?limit=10&offset=200
// router.get('/', (req, res) => {
//     const { limit, offset } = req.query;
//     if(limit && offset) {
//         res.json({
//             limit,
//             offset
//         })
//     } else {
//         res.send('No hay parámetros')
//     }
// });

router.get('/', (req, res) => {
    const users = [];
    const { size } = req.query;
    const limit = size || 10;
    for (let i = 0; i < limit; i++) {
        users.push({
            name: faker.name.firstName(),
            lastName: faker.name.lastName(),
            image: faker.image.imageUrl(),
        });
    }
    res.json(users);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    res.json({
        id,
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        image: faker.image.imageUrl(),
    });
});

router.post('/', (req, res) => {
    const body = req.body;
    res.json({
        message: 'Created user',
        data: body,
    });
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    res.json({
        message: 'Update partial user',
        data: body,
        id,
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({
        message: 'Deleted user',
        id,
    });
});

module.exports = router;
