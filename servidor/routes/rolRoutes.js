const express = require("express");
const router = express.Router();

//Rol controller para los métodos definidos
const rolController = require("../controller/rolController");

router.get("/", rolController.get);

router.get("/:id", rolController.getById);

module.exports = router;