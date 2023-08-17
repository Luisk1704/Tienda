const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports.getByCliente = async(request,response,next)=>{
    let id = parseInt(request.params.id);
    const metodo = await prisma.metodoPago.findMany({
        where:{idCliente:id}
    })
    response.json(metodo)
}

module.exports.create = async(request,response,next) => {
    let metodo = request.body
    console.log(request.body)
    const nuevoMetodo =  await prisma.metodoPago.create({
        data: {
          idCliente: metodo.idCliente,
          descripcion: metodo.descripcion,
          proveedor: metodo.proveedor,
          numeroCuenta: metodo.numeroCuenta,
          fechaExpiracion: metodo.fechaExpiracion
        }
      })
    response.json(nuevoMetodo)
}