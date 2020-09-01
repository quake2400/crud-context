const Empresa = require('../models/empresa');

exports.nuevaEmpresa = async (req, res) => {

    const empresa = new Empresa(req.body);
    //console.log(req.body);
    //return false;
    try {
        await empresa.save();
        //console.log("empresa creada correctamente");
        res.json({msg: 'Empresa registrada correctamente'});
    } catch (error) {
        console.log(error);
        res.status(400).json({msg: error});
    }
}

exports.allEmpresas = async (req, res) => {
    try {
        const empresa = await Empresa.find({});
        res.json({empresa});
    } catch (error) {
        console.log(error);
    }
}

exports.actualizarEmpresa = async(req, res) => {

    const { nombre, url, descripcion } = req.body;

    try {
    
        let empresa = await Empresa.findById(req.params.id);

        if(!empresa) {
            return res.status(404).json({msg: 'La empresa no existe'});
        }
        
        const nuevaEmpresa = {};
        nuevaEmpresa.nombre = nombre;
        nuevaEmpresa.url = url;
        nuevaEmpresa.nombre_imagen = empresa.nombre_imagen;
        nuevaEmpresa.descripcion = descripcion;

        actualiza = await Empresa.findOneAndUpdate({_id : req.params.id }, nuevaEmpresa, { new: true } );

         res.json({ actualiza });
    
    } catch (error) {
        console.log(error);
        res.status(400).json({msg: error});
    }

}

exports.deleteEmpresa = async(req, res) => {
    try {
        
        let empresa = await Empresa.findById(req.params.id);

        if(!empresa){
            return res.status(404).json({msg: 'No existe la empresa'});
        }

        await Empresa.findByIdAndRemove({_id: req.params.id});

        res.json({msg: 'Empresa Eliminada'});
        
    } catch (error) {
        console.log(error);
    }
}