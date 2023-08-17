const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports.getByCliente = async(request,response,next) =>{
    let id = parseInt(request.params.id)
    const direccion = await prisma.direccion.findMany({
        where:{usuarioId:id}
    })
    response.json(direccion) 
}

module.exports.create = async(request,response,next) => {
    let direccion = request.body
    console.log(request.body)
    const nuevadireccion =  await prisma.direccion.create({
        data: {
          usuarioId: direccion.usuarioId,
          provincia: direccion.provincia,
          canton: direccion.canton,
          distrito: direccion.distrito,
          direccionExacta: direccion.direccionExacta,
          codPostal: direccion.codPostal,
          telef: direccion.telef
        }
      })
    response.json(nuevadireccion)
}