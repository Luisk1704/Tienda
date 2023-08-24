const express = require("express")
const router = express.Router()

const evaluacionController = require("../controller/evaluacionController")

router.post("/",evaluacionController.crear)

module.exports = router