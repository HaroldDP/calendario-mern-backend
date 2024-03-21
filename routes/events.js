/*
    Event Routes
    /api/events
*/
const {Router} = require('express');
const {check} = require('express-validator');
const { isDate } = require('../helpers/isDate');
const {validarCapos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');
const {getEventos,crearEventos,actualizarEventos,eliminarEventos} = require('../controllers/events');


const router = Router();

// Todas  estan validadas por el JWT porque validarJWT en un nivel superior
// al de las rutas mostradas abajo.
router.use(validarJWT);

// Obtener eventos
router.get('/', getEventos)


// Crear un nuevo evento
router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatorio').custom(isDate),
        check('end','Fecha de finalizacio es obligatorio').custom(isDate),
        validarCapos // Va lo ultimo despues de todo los checks
    ],
    crearEventos
 )

// Actualizar Evento
router.put('/:id', actualizarEventos)


// Eliminar Evento
router.delete('/:id', eliminarEventos)


module.exports = router;
