const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports.get = async(request,response,next) => {
    const usuarios = await prisma.usuario.findMany({
        include: {
            rol: true
        }
    })
    response.json(usuarios)
}

module.exports.getById = async(request,response,next) => {
    let Id = parseInt(request.params.id)
    const usuario = await prisma.usuario.findUnique({
        where: {id:Id},
        include: {
            rol: true
        }
    })
    response.json(usuario)
}