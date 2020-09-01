const Empresa = require('../models/empresa');
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

exports.subirArchivo = async (req, res) => {

    const configuracionMulter = {
        limits : { fileSize : 1024 * 1024 * 10  },
        storage: fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname+'/../uploads');
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                cb(null, `${shortid.generate()}${extension}` );
            }
        })
    }

    const upload = multer(configuracionMulter).single('archivo');

    upload( req, res, async (error) => {
        //console.log(req.file);
        if(!error) {
            res.json({archivo: req.file.filename });
        } else {
            //console.log(error);
            res.status(400).json({msg: error});
        }
    });
}

exports.actualizarArchivo = async (req, res) =>{

    try {

        let empresa = await Empresa.findById(req.params.id);

        if(!empresa) {
            return res.status(404).json({msg: 'La empresa no existe'});
        }

        fs.unlinkSync(__dirname + `/../uploads/${empresa.nombre_imagen}`);

        const configuracionMulter = {
            limits : { fileSize : 1024 * 1024 * 10  },
            storage: fileStorage = multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, __dirname+'/../uploads');
                },
                filename: (req, file, cb) => {
                    const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                    cb(null, `${shortid.generate()}${extension}` );
                }
            })
        }

        const upload = multer(configuracionMulter).single('archivo');

        upload( req, res, async (error) => {

            if(!error) {
            
                const nuevaEmpresa = {};
                nuevaEmpresa.nombre_imagen = req.file.filename;
        
                actualiza = await Empresa.findOneAndUpdate({_id : req.params.id }, nuevaEmpresa, { new: true } );

                res.json({ actualiza });
                
            } else {
                res.status(400).json({msg: 'error al subir la imagen'});
            }
        });
    } catch (error) {
        console.log(error);
    }
}