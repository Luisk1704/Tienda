const express = require('express')
const router = express.Router()

const preguntaController = require('../controller/preguntaController')

router.get('/',preguntaController.get)
router.get('/:id',preguntaController.getById)

module.exports = router