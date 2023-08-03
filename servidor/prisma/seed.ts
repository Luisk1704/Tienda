import { PrismaClient, Rol } from "@prisma/client";
import { categorias } from "./seeds/categorias";
//import { roles } from "./seeds/roles"
import { metodosPago } from "./seeds/metodosPago";
import { proveedores } from "./seeds/proveedores";
const bcrypt = require("bcrypt");
let salt= bcrypt.genSaltSync(10);
/*
import { parse } from "url";
import { decompressFromBase64 } from "@prisma/client/runtime";
import { buffer } from "stream/consumers";*/

const prisma = new PrismaClient();

async function main() {
    await prisma.categoria.createMany({
        data: categorias
    })

    /*await prisma.rol.createMany({
        data: roles
    })*/

    await prisma.proveedor.createMany({
      data: proveedores
    })
    
    await prisma.usuario.create({
      data:{
        nombre: 'Luis Carlos Amores Villalobos',
        cedula: '207240989',
        telefono: '89763823',
        correo: 'lamoresvi@gmail.com',
        contrasenna: bcrypt.hashSync('123456',salt),
        estado: true,
        rol: Rol.ADMINISTRADOR
      }
    })

    await prisma.usuario.create({
      data:{
        nombre: 'Juan Jose Amores Villalobos',
        cedula: '207243838',
        telefono: '83500664',
        correo: 'juanAV@gmail.com',
        contrasenna: bcrypt.hashSync('123456',salt),
        estado: true,
        rol: Rol.VENDEDOR  
      }
    })

    await prisma.usuario.create({
      data:{
        nombre: 'Jose Amores Villalobos',
        cedula: '2075454544',
        telefono: '83454545',
        correo: 'jos@gmail.com',
        contrasenna: bcrypt.hashSync('123456',salt),
        estado: true,
        rol: Rol.VENDEDOR  
      }
    })

    await prisma.usuario.create({
      data:{
        nombre: 'Jennifer Amores Villalobos',
        cedula: '2075453333',
        telefono: '83453534',
        correo: 'jen@gmail.com',
        contrasenna: bcrypt.hashSync('123456',salt),
        estado: true,
        rol: Rol.CLIENTE  
      }
    })

    await prisma.usuario.create({
      data:{
        nombre: 'Jimena Valenzuela Villalobos',
        cedula: '23232434343',
        telefono: '87877878',
        correo: 'Jimena@gmail.com',
        contrasenna: bcrypt.hashSync('123456',salt),
        estado: true,
        rol: Rol.VENDEDOR  
      }
    })

    await prisma.usuario.create({
      data:{
        nombre: 'Oscar Rodriguez Villalobos',
        cedula: '32434343',
        telefono: '88888888',
        correo: 'Oscar@gmail.com',
        contrasenna: bcrypt.hashSync('123456',salt),
        estado: true,
        rol: Rol.CLIENTE  
      }
    })

    await prisma.usuario.create({
      data:{
        nombre: 'Jaime Lozano Guarnizo',
        cedula: '454545454',
        telefono: '999977777',
        correo: 'Jaime@gmail.com',
        contrasenna: bcrypt.hashSync('123456',salt),
        estado: true,
        rol: Rol.CLIENTE  
      }
    })

    await prisma.metodoPago.create({
      data:{
        idCliente: 4,
        descripcion: "Tarjeta",
      }
    })

    await prisma.metodoPago.create({
      data:{
        idCliente: 4,
        descripcion: "Efectivo"
      }
    })

    await prisma.metodoPago.create({
      data:{
        idCliente: 4,
        descripcion: "Sinpe Movil"
      }
    })

    await prisma.metodoPago.create({
      data:{
        idCliente: 6,
        descripcion: "Tarjeta",
      }
    })

    await prisma.metodoPago.create({
      data:{
        idCliente: 6,
        descripcion: "Efectivo"
      }
    })

    await prisma.metodoPago.create({
      data:{
        idCliente: 6,
        descripcion: "Sinpe Movil"
      }
    })

    await prisma.metodoPago.create({
      data:{
        idCliente: 7,
        descripcion: "Tarjeta",
      }
    })

    await prisma.metodoPago.create({
      data:{
        idCliente: 7,
        descripcion: "Efectivo"
      }
    })

    await prisma.metodoPago.create({
      data:{
        idCliente: 7,
        descripcion: "Sinpe Movil"
      }
    })

    /*await prisma.ropa.create({
      data: {
        nombre: "Camisa",
        cantidad: 50,        
        proveedorId: 1,        
        precio: 15000.23,
        vendedorId: 2,
        estado: "usado-nuevo",
        categorias: {
          connect: [{id: 18} , { id: 19 } , { id: 7 }]
        }
      }
    })

    await prisma.ropa.create({
      data: {
        nombre: "Tenis",
        cantidad: 100,        
        proveedorId: 2,        
        precio: 40000.23,
        vendedorId: 2,
        estado: "nuevo",
        categorias: {
          connect: [{id: 16} , { id: 17 }]
        }
      }
    })

    await prisma.ropa.create({
      data: {
        nombre: "Camiseta",
        cantidad: 100,        
        proveedorId: 3,        
        precio: 30000.23,
        vendedorId: 2,
        estado: "usado-aceptable",
        categorias: {
          connect: [{id: 8} , { id: 18 }]
        }
      }
    })

    await prisma.ropa.create({
      data: {
        nombre: "Camiseta",
        cantidad: 200,        
        proveedorId: 3,        
        precio: 40000.23,
        vendedorId: 2,
        estado: "usado-nuevo",
        categorias: {
          connect: [{id: 8} , { id: 18 }]
        }
      }
    })

    await prisma.ropa.create({
      data: {
        nombre: "Camisa",
        cantidad: 100,        
        proveedorId: 2,        
        precio: 40000.23,
        vendedorId: 5,
        estado: "usado-aceptable",
        categorias: {
          connect: [{id: 18} , { id: 20}]
        }
      }
    })

    await prisma.ropa.create({
      data: {
        nombre: "Camisa",
        cantidad: 100,        
        proveedorId: 3,        
        precio: 40000.23,
        vendedorId: 5,
        estado: "nuevo",
        categorias: {
          connect: [{id: 18} , { id: 20}]
        }
      }
    })

    await prisma.ropa.create({
      data: {
        nombre: "Camisa",
        cantidad: 200,        
        proveedorId: 3,        
        precio: 15000.23,
        vendedorId: 5,
        estado: "nuevo",
        categorias: {
          connect: [{id: 18} , { id: 20}]
        }
      }
    })

    await prisma.ropa.create({
      data: {
        nombre: "Camisa",
        cantidad: 500,        
        proveedorId: 2,        
        precio: 15000.23,
        vendedorId: 5,
        estado: "usado-aceptable",
        categorias: {
          connect: [{id: 18} , { id: 20}]
        }
      }
    })*/       

    await prisma.direccion.create({
      data:{
        usuarioId: 4,
        provincia: "Alajuela",
        canton: "San Carlos",
        distrito: "Ciudad Quesada",
        direccionExacta: "3 mts oeste",
        codPostal: "313233",
        telef: "89882112"
      }
    })

    await prisma.direccion.create({
      data:{
        usuarioId: 6,
        provincia: "Alajuela",
        canton: "Alajuela",
        distrito: "Alajuela",
        direccionExacta: "4 mts este",
        codPostal: "313234",
        telef: "89888788"
      }
    })

    await prisma.direccion.create({
      data:{
        usuarioId: 1,
        provincia: "San Jose",
        canton: "Perez Zeledon",
        distrito: "Rivas",
        direccionExacta: "5 mts norte",
        codPostal: "383232",
        telef: "89886776"
      }
    })

    /*await prisma.pedido.create({
      data: {
        idPago: 1,
        clienteId: 4,
        direccionId: 1,
        descuento: 0.12,
        IV: 0.13,
        subtotal: 70000,
        estado: "Pendiente",
        Total: 65000
      }
    })

    await prisma.pedido.create({
      data: {
        idPago: 1,
        clienteId: 4,
        direccionId: 1,
        descuento: 0.12,
        IV: 0.13,
        subtotal: 120000,
        estado: "En Progreso",
        Total: 115000
      }
    })

    await prisma.pedido.create({
      data: {
        idPago: 1,
        clienteId: 4,
        direccionId: 1,
        descuento: 0.12,
        IV: 0.13,
        subtotal: 120000,
        estado: "En Progreso",
        Total: 115000
      }
    })

    await prisma.pedido.create({
      data: {
        idPago: 1,
        clienteId: 4,
        direccionId: 1,
        descuento: 0.12,
        IV: 0.13,
        subtotal: 30000,
        estado: "Finalizado",
        Total: 115000
      }
    })

    await prisma.pedido.create({
      data: {
        idPago: 4,
        clienteId: 6,
        direccionId: 2,
        descuento: 0.12,
        IV: 0.13,
        subtotal: 15000,
        estado: "Finalizado",
        Total: 115000
      }
    })

    await prisma.pedido.create({
      data: {
        idPago: 4,
        clienteId: 6,
        direccionId: 2,
        descuento: 0.12,
        IV: 0.13,
        subtotal: 30000,
        estado: "Entregado",
        Total: 25000
      }
    })

    await prisma.pedido.create({
      data: {
        idPago: 4,
        clienteId: 6,
        direccionId: 2,
        descuento: 0.12,
        IV: 0.13,
        subtotal: 120000,
        estado: "Finalizado",
        Total: 113000
      }
    })

    await prisma.pedido.create({
      data: {
        idPago: 4,
        clienteId: 6,
        direccionId: 2,
        descuento: 0.12,
        IV: 0.13,
        subtotal: 30000,
        estado: "Finalizado",
        Total: 113000
      }
    })  
    
    await prisma.pedidoRopa.create({
      data:{
        idRopa: 1,
        idPedido: 1,
        cantidad: 2,
        subtotal: 30000
      }
    })

    await prisma.pedidoRopa.create({
      data:{
        idRopa: 2,
        idPedido: 1,
        cantidad: 2,
        subtotal: 80000
      }
    })

    await prisma.pedidoRopa.create({
      data:{
        idRopa: 2,
        idPedido: 2,
        cantidad: 3,
        subtotal: 120000
      }
    })

    await prisma.pedidoRopa.create({
      data:{
        idRopa: 3,
        idPedido: 3,
        cantidad: 2,
        subtotal: 80000
      }
    })

    await prisma.pedidoRopa.create({
      data:{
        idRopa: 1,
        idPedido: 4,
        cantidad: 2,
        subtotal: 80000
      }
    })

    await prisma.pedidoRopa.create({
      data:{
        idRopa: 3,
        idPedido: 5,
        cantidad: 2,
        subtotal: 80000
      }
    })

    await prisma.pedidoRopa.create({
      data:{
        idRopa: 1,
        idPedido: 6,
        cantidad: 2,
        subtotal: 80000
      }
    })

    await prisma.pedidoRopa.create({
      data:{
        idRopa: 1,
        idPedido: 7,
        cantidad: 2,
        subtotal: 80000
      }
    })

    await prisma.evaluacion.create({
      data:{
        nombre: "Jimena Valenzuela",
        usuarioId: 1,
        pedidoId: 1,
        usuarioRol: "Vendedor",
        nota: 90
      }
    })

    await prisma.evaluacion.create({
      data:{
        nombre: "Jimena Valenzuela",
        usuarioId: 1,
        pedidoId: 1,
        usuarioRol: "Vendedor",
        nota: 90
      }
    })

    await prisma.evaluacion.create({
      data:{
        nombre: "Maria Jose",
        usuarioId: 2,
        pedidoId: 2,
        usuarioRol: "Vendedor",
        nota: 70
      }
    })

    await prisma.foto.create({
      data:{
        ropaId: 1,
        foto: "https://static.netshoes.com.br/produtos/camiseta-nike-sb-basica-estampada-dry-air-masculina/11/HZM-1061-511/HZM-1061-511_zoom2.jpg?ts=1614199609",        
      }
    })

    await prisma.foto.create({
      data:{
        ropaId: 1,
        foto: "https://cdn.laredoute.com/products/641by641/a/9/3/a93d09773b853b7b6771cfcf4541469e.jpg",        
      }
    })

    await prisma.foto.create({
      data:{
        ropaId: 2,
        foto: "https://http2.mlstatic.com/tennis-adidas-up-superstar-D_NQ_NP_651811-MLM20643108480_032016-F.jpg",        
      }
    })

    await prisma.foto.create({
      data:{
        ropaId: 3,
        foto: "https://i.pinimg.com/474x/43/f8/68/43f868e726bda42c58dab1b345c348f5.jpg",        
      }
    })

    await prisma.foto.create({
      data:{
        ropaId: 4,
        foto: "https://cdnc.lystit.com/photos/a0a3-2014/09/23/lacoste-black-leather-croc-polo-shirt-product-1-23972016-0-562306704-normal.jpeg",        
      }
    })

    await prisma.foto.create({
      data:{
        ropaId: 4,
        foto: "http://taru.vn/image/cache/data/product-5382/H21864-500x500.jpg",        
      }
    })

    await prisma.foto.create({
      data:{
        ropaId: 4,
        foto: "https://i.pinimg.com/originals/ce/46/ad/ce46adf253f58d79ca590e3d9f36ea25.jpg",        
      }
    })

    await prisma.foto.create({
      data:{
        ropaId: 5,
        foto: "https://estaticos.ilastec.com/archivos/valsshop/Productos/Productos/Productos/camiseta-adidas-negra-5fe6345fe27.jpg",        
      }
    })

    await prisma.foto.create({
      data:{
        ropaId: 5,
        foto: "http://marcadegol.com/fotos/2017/11/camiseta-adidas-de-espana-mundial-2018-frente.jpg",        
      }
    })

    await prisma.foto.create({
      data:{
        ropaId: 5,
        foto: "https://marcadegol.com/fotos/2019/03/camiseta-adidas-de-espana-mundial-femenino-2019-1-660x825.jpg",        
      }
    })

    await prisma.foto.create({
      data:{
        ropaId: 6,
        foto: "http://marcadegol.com/fotos/2017/11/camiseta-adidas-de-espana-mundial-2018-frente.jpg",        
      }
    })

    await prisma.foto.create({
      data:{
        ropaId: 7,
        foto: "https://http2.mlstatic.com/tenis-coq-sportif-hombre-D_NQ_NP_714715-MCO27193993547_042018-F.jpg",        
      }
    })

    await prisma.foto.create({
      data:{
        ropaId: 8,
        foto: "https://www.surfstitch.com/on/demandware.static/-/Sites-ss-master-catalog/default/dw0ebcc942/images/DV2555BLK/BLACK-WOMENS-CLOTHING-ADIDAS-SHORTS-DV2555BLK_2.JPG",        
      }
    })

    await prisma.foto.create({
      data:{
        ropaId: 8,
        foto: "https://cdnd.lystit.com/photos/jdsports/8a417a58/adidas-Black-Entrada-Poly-Shorts.jpeg",        
      }
    })

    await prisma.foto.create({
      data:{
        ropaId: 8,
        foto: "https://www.tennis-point.com/images/xxl/GM0478.jpg?v=101774254459-1",        
      }
    })

    await prisma.informe.create({
      data:{
        descripcion: "Las camisas Lacoste estan agotadas",
        usuarioId: 1
      }
    })

    await prisma.informe.create({
      data:{
        descripcion: "Se necesita solicitar calzado deportivo Nike y Adidas",
        usuarioId: 1
      }
    })

    await prisma.informe.create({
      data:{
        descripcion: "Se necesita reclutar nuevos vendedores",
        usuarioId: 1
      }
    })

    await prisma.pregunta.create({
      data:{        
        descripcion: "Tienen camisas Nike talla S?",
        usuarioId: 4,
        ropaId: 2
      }
    })

    await prisma.pregunta.create({
      data:{        
        descripcion: "Existen camisas Nike color naranja?",
        usuarioId: 4,
        ropaId: 2
      }
    })

    await prisma.pregunta.create({
      data:{        
        descripcion: "Existen camisas Nike talla XL?",
        usuarioId: 4,
        ropaId: 3
      }
    })

    await prisma.pregunta.create({
      data:{        
        descripcion: "Existen camisas Lacoste de cuello V?",
        usuarioId: 4,
        ropaId: 3
      }
    })

    await prisma.pregunta.create({
      data:{        
        descripcion: "Existen camisas Lacoste de talla S?",
        usuarioId: 4,
        ropaId: 4
      }
    })

    await prisma.pregunta.create({
      data:{        
        descripcion: "Existen camisas Lacoste de color negro?",
        usuarioId: 4,
        ropaId: 4
      }
    })

    await prisma.pregunta.create({
      data:{        
        descripcion: "Existen camisas Lacoste de color negro?",
        usuarioId: 4,
        ropaId: 5
      }
    })

    await prisma.pregunta.create({
      data:{        
        descripcion: "Existen camisas Lacoste de cuello redondo?",
        usuarioId: 4,
        ropaId: 5
      }
    })

    await prisma.pregunta.create({
      data:{        
        descripcion: "Existen tenis Adidas para futbol 11?",
        usuarioId: 4,
        ropaId: 6
      }
    })

    await prisma.pregunta.create({
      data:{        
        descripcion: "Existen camisas Nike para salir?",
        usuarioId: 4,
        ropaId: 6
      }
    })

    await prisma.pregunta.create({
      data:{        
        descripcion: "Existen camisas Nike para salir?",
        usuarioId: 4,
        ropaId: 7
      }
    })

    await prisma.pregunta.create({
      data:{        
        descripcion: "Existen camisas Nike para pequeñas?",
        usuarioId: 4,
        ropaId: 7
      }
    })

    await prisma.respuesta.create({
      data:{
        descripcion: "Ya se agotaron todas las camisas Nike de esa talla",
        usuarioId: 2,
        preguntas:{
          connect: [{id:1}]
        }
      }
    })

    await prisma.respuesta.create({
      data:{
        descripcion: "Si, todavia hay tenis Adidas de ese color",
        usuarioId: 2,
        preguntas:{
          connect: [{id:2}]
        }
      }
    })

    await prisma.respuesta.create({
      data:{
        descripcion: "No existen camisas Lacoste con ese tipo de cuello",
        usuarioId: 2,
        preguntas:{
          connect: [{id:3}]
        }
      }
    })

    await prisma.respuesta.create({
      data:{
        descripcion: "No existen camisas Lacoste con esa talla",
        usuarioId: 2,
        preguntas:{
          connect: [{id:5}]
        }
      }
    })

    await prisma.respuesta.create({
      data:{
        descripcion: "No existen camisas Adidas con esa talla",
        usuarioId: 2,
        preguntas:{
          connect: [{id:7}]
        }
      }
    })

    /*var img = "https://i.pinimg.com/originals/4e/11/19/4e111914a040865ee1891d75f7245743.jpg"
    var imgconverted = 

    await prisma.foto.create({
      data:{
        ropaId: 1,
        foto: img
      }
    })*/
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    //process.exit(1);
  });