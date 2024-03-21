const {response} = require('express');
const Usuario = require('../models/Usuario');
const  bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');

// res = express.response para activar la intelligent que tiene el response
const crearUsuario = async(req , res = response) => {

    const {email, password} = req.body;

    try {
        // Buscar  un usuario que  existe con ese  correo
        let usuario = await Usuario.findOne({ email})
        if(usuario){
            return res.status(400).json({
                ok: false,
                msg:'Un usuario existe con ese correo'
            })
        }
        // Creando un usuario si no existe
         usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt =  bcrypt.genSaltSync();
        usuario.password =  bcrypt.hashSync(password, salt)


         await usuario.save();

         // Generar el Tokens Cuando se  debe grabar el usuario
        //  Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token,          
        });


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Por favor hable con el administrador'

        })
    }

    
}

const loginUsuario = async(req , res = response) =>{
    
    const {password, email} = req.body;

    try {
        const usuario = await Usuario.findOne({ email});

        //CONFIRMACION DEL USUARIO
        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg:'El usuario no existe con ese email'
            })
        }

        // CONFIRMAR LOS PASSWORD
        // comparacion  del password con el password que esta en la base de datos
        const validPassword = bcrypt.compareSync( password, usuario.password )

        if (!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }
        //  Generamos el tokens para authenticarnos
        // GENERAR NUESTRO JWT
        const token = await generarJWT(usuario.id, usuario.name);
        res.json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token,
        });




    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Por favor hable con el administrador'

        });
    }
}

const revalidarToken = async(req , res = response) =>{
    const {uid, name} = req;
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        token
    })
}

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
}