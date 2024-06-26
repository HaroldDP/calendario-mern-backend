const {response} = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) =>{

    // x-token headers
    const token =  req.header('x-token');

    // Si el token no viene
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'no hay token en la peticion'
        });
    }

    // Verifica  si el token es valido

    try {
    // Aca destructuramos el PAYLOAD (La informacion del usuario)
        const {uid, name} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name;

         
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token no valido'
        });
    }

    next();
}

module.exports ={
    validarJWT
}