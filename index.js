const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errors.handler');

const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

// Middleware para recibir información del tipo JSON
app.use(express.json());
// Middleware para recibir consultas de otros origenes
const whitelist = [
    'http://localhost:3000',
    'http://127.0.0.1:5500',
    'https://myapp.ar'
];
const options = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin || !origin)) {
            callback(null, true);
        } else {
            callback(new Error('Acceso no permitido'));
        }
    }
}
app.use(cors(options));

app.get('/', (req, res) => {
    res.send('Hola mi server en Express');
});

app.get('/nueva-ruta', (req, res) => {
    res.send('Hola, soy una nueva ruta');
});

// Llamamos la función routerApi pasandole el app
routerApi(app);

// Aplicamos el uso de los middlewares de error
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log('Servidor corriendo... http://localhost:' + port);
});
