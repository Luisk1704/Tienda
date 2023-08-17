const express = require("express")
const router = express.Router()
const auth=require("../middleware/auth");

const usuarioController = require("../controller/usuarioController")


router.get('/',auth.grantRole(["ADMINISTRADOR"]),usuarioController.get)
router.get('/:id',auth.grantRole(["ADMINISTRADOR"]),usuarioController.getById)
router.post('/login',usuarioController.login)
router.post('/registrar',usuarioController.register)
router.put('/:id',auth.grantRole(["ADMINISTRADOR"]),usuarioController.update);

module.exports = router