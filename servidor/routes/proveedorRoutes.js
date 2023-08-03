const express = require("express")
const router = express.Router()

const proveedorController = require("../controller/proveedorController")

router.get("/",proveedorController.get)

module.exports = router