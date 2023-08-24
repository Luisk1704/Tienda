const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports.crear = async(request,response,next) =>{
    let evaluacion = request.body
    const crear = await prisma.evaluacion.create({
        data:{
            nombre: evaluacion.nombre,
            usuarioId: evaluacion.usuarioId,
            pedidoId: evaluacion.pedidoId,
            nota: parseInt(evaluacion.nota),
            descripcion: evaluacion.descripcion,
            usuarioRol: evaluacion.usuarioRol
        }
    })
    response.json(crear)
}