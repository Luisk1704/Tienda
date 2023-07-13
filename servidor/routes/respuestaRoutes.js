const express = require('express')
const router = express.Router()

const respuestaController = require('../controller/respuestaController')

router.get('/',respuestaController.get)
router.get('/:id',respuestaController.getById)

module.exports = router