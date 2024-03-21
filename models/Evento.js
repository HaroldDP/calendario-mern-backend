const {Schema, model} = require('mongoose')

const EventoSchema = Schema({

    title:{
        type: String,
        required:true
    },

    notes:{
        type: String,
    },

    start:{
        type: Date,
        required: true
    },

    end:{
        type: Date,
        required: true
    },
    
    // Indicar cual fue el usuario que creo el evento
    user:{
        type: Schema.Types.ObjectId,
        ref:'Usuario', //  Este es el otro esquema creado para el usuario
        required: true
    }
    
});

// Cambiando el nombre de las propiedades  solamente al json
EventoSchema.method('toJSON', function(){
    //toObject() le estamos haciendo referencia a todo el objeto
    const { __v, _id, ...object } = this.toObject();
    object.id =  _id;
    return object

})

module.exports = model('Evento', EventoSchema);