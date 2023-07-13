const express = require("express")
const router = express.Router()

const compraController = require("../controller/compraController")

router.get("/",compraController.get)
router.get("/:id",compraController.getById)

module.exports = router