const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

module.exports.get = async(request,response,next) => {
    const compras = await prisma.compra.findMany({
        include:{
            usuario: true,
            //ordenes: true
        }
    })
    response.json(compras)
}

module.exports.getById = async(request,response,next) => {
    let id = parseInt(request.params.id)
    const compra = await prisma.compra.findUnique({
        where:{id:id},
        include:{
            usuario: true,
            //ordenes: true
        }
    })
    response.json(compra)
}