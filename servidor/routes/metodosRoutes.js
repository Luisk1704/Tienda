const express = require('express')
const router = express.Router()

const metodoController = require('../controller/metodosController')

router.get('/id:',metodoController.getByCliente)

module.exports = router