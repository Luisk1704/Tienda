const express = require('express')
const router = express.Router()

const direccionController = require('../controller/direccionController')

router.post('/',direccionController.create)
router.get('/:id',direccionController.getByCliente)

module.exports = router