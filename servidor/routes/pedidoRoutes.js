const express = require("express")
const router = express.Router()
const auth=require("../middleware/auth");

const pedidoController = require("../controller/pedidoController")

router.get('/',auth.grantRole(["CLIENTE"]),pedidoController.get)
router.post('/',auth.grantRole(["CLIENTE"]),pedidoController.crear)
router.get("/ropaTop",pedidoController.getVentaProductoTop);
router.get('/topvendedores',pedidoController.getTopVendedores)
router.get('/topPeores',pedidoController.getTopPeores)
router.get('/:id',auth.grantRole(["VENDEDOR","CLIENTE"]),pedidoController.getById)
router.get('/mejorCliente/:id',pedidoController.getMejorCliente)
router.get('/ropaProducto/:mes', pedidoController.getVentaProductoMes);
router.get('/masVendida/:id', pedidoController.getMasVendido);
router.get('/vendedor/:id',pedidoController.getByIdvendedor)
router.get('/cliente/:id',pedidoController.getByIdcliente)
router.put('/:id',auth.grantRole(["VENDEDOR"]),pedidoController.update);


module.exports = router