/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const {Router} = require('express');
const {check} = require('express-validator');
const { validarCapos } = require('../middlewares/validar-campos');
const { crearUsuario,loginUsuario, revalidarToken } = require('../controllers/auth');
const {validarJWT} = require('../middlewares/validar-jwt');

const router = Router();

router.post(
    '/new',
    [   // (VALIDACCIONES)
        // middlewares 
        // Chequea que se halla mandado ell parametro name correspondientes
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min:6}),
        validarCapos
    ],
     crearUsuario);

router.post(
    '/',
    [
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe de ser de 6 caracteristicas').isLength({min:6}),
        
        // Se aplica la funcion de validar campos del archivo validar
        validarCapos
    ], 
    loginUsuario );


router.get('/renew',validarJWT,revalidarToken );

// Asi se exporta con Node
module.exports = router;