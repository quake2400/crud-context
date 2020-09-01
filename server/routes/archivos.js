const express = require('express');
const router = express.Router();
const archivosController = require('../controllers/archivosController');

router.post('/',
    archivosController.subirArchivo
);

router.put('/:id',
    archivosController.actualizarArchivo
);

module.exports = router;