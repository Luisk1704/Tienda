const express = require("express")
const router = express.Router()

const usuarioController = require("../controller/usuarioController")


router.get('/',usuarioController.get)
router.get('/abort')
router.get('/:id',usuarioController.getById)
router.post('/login',usuarioController.login)
router.post('/registrar',usuarioController.register)

module.exports = router