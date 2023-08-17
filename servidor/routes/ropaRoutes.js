const express = require("express")
const router = express.Router()
const auth=require("../middleware/auth");


const ropaController = require("../controller/ropaController")

router.get('/',ropaController.get)
router.get('/precio_asc',ropaController.getPrecioAsc)
router.get('/precio_desc',ropaController.getPrecioDsc)
router.post('/',auth.grantRole(["ADMINISTRADOR","VENDEDOR"]),ropaController.create)
router.get('/:id',ropaController.getByID)
router.get('/vendedor/:id',auth.grantRole(["VENDEDOR"]),ropaController.getByVendedor)
router.put('/:id',ropaController.update);

module.exports = router