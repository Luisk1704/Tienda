const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports.get = async(request,response,next) => {
    const ropas = await prisma.foto.findMany()
    response.json(ropas)
}

module.exports.create = async(request,response,next) => {
    let Foto = request.body
    const nuevaRopa =  await prisma.foto.create({
        data: {
            ropaId: Foto.id,
            foto: Foto.foto2
        }
      })
    response.json(nuevaRopa)
}