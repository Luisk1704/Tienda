const path = require('path')
//const uploads = require('./uploads')

const bodyParser = require('body-parser');


const dotEnv = require("dotenv");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const logger = require("morgan");
const app = express();

app.use(bodyParser.json({parameterLimit: 100000,limit: '100mb', extended:true }));
app.use(bodyParser.urlencoded({ parameterLimit: 100000,limit: '100mb', extended: true }));
//app.use(express.multipart)
const prism = new PrismaClient();
//---Archivos de rutas---
const usuariosRoutes = require('./routes/usuarioRoutes')
const ropasRoutes = require('./routes/ropaRoutes')
const pedidosRoutes = require('./routes/pedidoRoutes')
const compraRoutes = require('./routes/compraRoutes')
const preguntaRoutes = require('./routes/preguntaRoutes')
const respuestaRoutes = require('./routes/respuestaRoutes')
const categoriaRoutes = require('./routes/categoriaRoutes')
const proveedorRoutes = require('./routes/proveedorRoutes')
const fotoRoutes = require('./routes/fotoRoutes');
const metodoRoutes = require('./routes/metodosRoutes');
const direccionesRoutes = require('./routes/direccionRoutes');
const rolRoutes = require('./routes/rolRoutes');
const multer = require('multer');
/*const videojuegosRoutes = require("./routes/videojuegosRoutes")
const ordenesRutas = require("./routes/ordenesRutas")*/
// Acceder a la configuracion del archivo .env
dotEnv.config();

// app.use(multer({
//     dest: path.join(__dirname,'./uploads')
// }).single('foto1'))
// Puerto que escucha por defecto 300 o definido .env
const port = process.env.PORT || 3000;
// Middleware CORS para aceptar llamadas en el servidor
app.use(cors());
// Middleware para loggear las llamadas al servidor
app.use(logger("dev"));
// Middleware para gestionar Requests y Response json
app.use(express.json());
/*app.use(
express.urlencoded({
extended: true,
})
);*/
//---- Definir rutas ----
app.use('/usuario/',usuariosRoutes)
app.use('/ropa/',ropasRoutes)
app.use('/pedido/',pedidosRoutes)
app.use('/compra/',compraRoutes)
app.use('/pregunta/',preguntaRoutes)
app.use('/respuesta/',respuestaRoutes)
app.use('/categoria/',categoriaRoutes)
app.use('/proveedor/',proveedorRoutes)
app.use('/foto/',fotoRoutes)
app.use('/metodo/',metodoRoutes)
app.use('/direccion/',direccionesRoutes)
app.use('/rol/',rolRoutes)
app.use('/uploads',express.static(path.resolve('uploads')))
/*app.use("/videojuego/",videojuegosRoutes)
app.use("/orden",ordenesRutas)*/
// Servidor
app.listen(port, () => { 
console.log(`http://localhost:${port}`);
console.log("Presione CTRL-C para deternerlo\n");
});