const express = require("express")
const router = express.Router()

const pedidoController = require("../controller/pedidoController")

router.get('/',pedidoController.get)
router.get('/:id',pedidoController.getById)
router.get('/vendedor/:id',pedidoController.getByIdvendedor)
router.get('/cliente/:id',pedidoController.getByIdcliente)


module.exports = router