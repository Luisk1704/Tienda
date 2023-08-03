const express = require('express')
const router = express.Router()

const auth=require("../middleware/auth");

const respuestaController = require('../controller/respuestaController')

router.get('/',respuestaController.get)
router.post('/',auth.grantRole(['ADMINISTRADOR','VENDEDOR']),respuestaController.create)
router.get('/:id',respuestaController.getById)

module.exports = router