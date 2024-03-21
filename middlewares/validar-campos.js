const {response} = require('express');
const {validationResult} = require('express-validator');

const validarCapos= (req, res = response, next) =>{
    // MANEJO DE ERRORES DEL MIDELWARE
    const errors = validationResult(req)
     // Si hay errores
    if(!errors.isEmpty()){
        return res.json({
            ok:false,
            errors: errors.mapped()
        });
    }

    next()
}

module.exports = {
    validarCapos
}