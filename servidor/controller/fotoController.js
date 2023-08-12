const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports.get = async(request,response,next) => {
    const fotos = await prisma.foto.findMany()
    response.json(fotos)
}

module.exports.create = async(request,response,next) => {
    let Foto = request.body
    const nuevafoto =  await prisma.foto.create({
        data: {
            ropaId: Foto.id,
            foto: Foto.foto
        }
      })
    response.json(nuevafoto)
}

module.exports.update = async (request, response, next) => {
    let Foto = request.body;
    let id = parseInt(request.params.id);
    //Obtener foto viejo  
    const nuevafoto =  await prisma.foto.update({
        where:{id: id},
        data: {
            ropaId: Foto.idRopa,
            foto: Foto.foto
        }
      })
    response.json(nuevafoto);
  };