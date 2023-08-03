const express = require('express')
const router = express.Router()
const auth=require("../middleware/auth");

const preguntaController = require('../controller/preguntaController')

router.get('/',preguntaController.get)
router.post('/',auth.grantRole(["CLIENTE"]),preguntaController.create)
router.get('/:id',preguntaController.getById)

module.exports = router