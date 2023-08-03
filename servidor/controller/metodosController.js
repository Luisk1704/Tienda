const { PrismaClient } = require('@prisma/client')
const { request } = require('http')
const prisma = new PrismaClient()

module.exports.getByCliente = async(request,response,next)=>{
    let id = parseInt(request.params.id);
    const metodo = await prisma.metodoPago.findMany({
        where:{idCliente:id}
    })
    response.json(metodo)
}