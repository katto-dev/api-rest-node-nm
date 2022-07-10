const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
    // Retornamos un middleware dinámico
    return (req, res, next) => {
        const data = req[property];
        /* ¿De dónde viene la información?
        POST --> req.body
        GET  --> req.params o req.query
        */
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            // Enviamos a los middlewares del tipo error
            next(boom.badRequest(error));
        }
        next();
    }
}

module.exports = validatorHandler;
