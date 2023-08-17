const express = require("express")
const router = express.Router()
const auth=require("../middleware/auth");

const pedidoController = require("../controller/pedidoController")

router.get('/',auth.grantRole(["CLIENTE"]),pedidoController.get)
router.post('/',auth.grantRole(["CLIENTE"]),pedidoController.crear)
router.get('/:id',auth.grantRole(["VENDEDOR","CLIENTE"]),pedidoController.getById)
router.get('/vendedor/:id',pedidoController.getByIdvendedor)
router.get('/cliente/:id',pedidoController.getByIdcliente)


module.exports = router