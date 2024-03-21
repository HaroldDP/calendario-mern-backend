const {response} = require('express')
const Evento = require('../models/Evento')

const getEventos = async(req, res = response ) =>{
    // Me muestra todo los eventos creados
    const eventos = await Evento.find()
    //Pupulate Permite rellenar los datos del usuario
                                .populate('user','name');

    res.json({
        ok: true,
        eventos
    });
}
const crearEventos = async(req, res = response ) =>{

    // Creamos la Instancia 
    const evento = new Evento( req.body)

    try {
        //El evento.user tipo "user" biene de la base de datos que necesita que le pase el id.
        evento.user = req.uid;
        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }

}

const actualizarEventos = async(req, res = response ) =>{

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId)

        if (!evento){
          return  res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
        });
    }


    if(evento.user.toString() !== uid){
        return res.status(401).json({
            ok: false,
            msg: 'No tiene privilegio de editar este evento'

        })  
    }
    // Obtencion de la nueva data
    const nuevoEvento = {
        ...req.body,
        user: uid
    }
    // findByIdAndUpdate. Busqueme el evento  id y lo actualice  en este caso
    // caso el evento que queremos actualizar es eventoId 
    const eventoActualizado =  await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true});

    res.json({
        ok:true,
        evento:eventoActualizado
    });

   
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Habla con el  adminsitrador'
        });
        
    }
}

const eliminarEventos = async(req, res = response ) =>{

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId)

        if (!evento){
          return  res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
        });
    }


    if(evento.user.toString() !== uid){
        return res.status(401).json({
            ok: false,
            msg: 'No tiene privilegio de eliminar este evento'

        })  
    }
    
  
     await Evento.findByIdAndDelete(eventoId);

     res.json({
        ok:true
     });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Habla con el  adminsitrador'
        });
        
    }

}

module.exports = {
    getEventos,
    crearEventos,
    actualizarEventos,
    eliminarEventos,
}