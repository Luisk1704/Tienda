const express = require("express")
const router = express.Router()
const auth=require("../middleware/auth");


const ropaController = require("../controller/ropaController")

router.get('/',auth.grantRole(["CLIENTE"]),ropaController.get)
router.post('/',auth.grantRole(["ADMINISTRADOR","VENDEDOR"]),ropaController.create)
router.get('/:id',auth.grantRole(["ADMINISTRADOR","VENDEDOR","CLIENTE"]),ropaController.getByID)
router.get('/vendedor/:id',auth.grantRole(["VENDEDOR"]),ropaController.getByVendedor)
router.put('/:id',ropaController.update);

module.exports = router