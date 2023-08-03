const express = require("express")
const router = express.Router()

const categoriaController = require("../controller/categoriaController")

router.get("/",categoriaController.get)

module.exports = router