const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

module.exports.get = async(request,response,next) => {
    const proveedores = await prisma.proveedor.findMany({})
    response.json(proveedores)
}