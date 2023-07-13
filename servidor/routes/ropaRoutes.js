const express = require("express")
const router = express.Router()

const ropaController = require("../controller/ropaController")

router.get('/',ropaController.get)
router.get('/',ropaController.getByVendedor)
router.get('/:id',ropaController.getByID)
router.get('/vendedor/:id',ropaController.getByVendedor)

module.exports = router