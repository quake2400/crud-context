const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');

router.post('/',
    empresaController.nuevaEmpresa
);

router.get('/',
    empresaController.allEmpresas
);

router.put('/:id',
    empresaController.actualizarEmpresa
);

router.delete('/:id',
    empresaController.deleteEmpresa
);

module.exports = router;