const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require('path')
// router.use(multer({
//     dest: path.join(__dirname,'../uploads')
// }).single('foto1'))

const fotoController = require("../controller/fotoController")


router.get('/',fotoController.get)
router.post('/',fotoController.create)
router.put('/:id',fotoController.update);

module.exports = router