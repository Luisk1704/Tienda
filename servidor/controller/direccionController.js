const { PrismaClient } = require('@prisma/client')
const { response } = require('express')
const prisma = new PrismaClient()

module.exports.getByCliente = async(request,response,next) =>{
    let idCliente = parseInt(request.params.id)
    const direccion = await prisma.direccion.findMany({
        where:{idCliente:idCliente}
    })
    response.json(direccion) 
}