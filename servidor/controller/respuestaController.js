const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

module.exports.get = async(request,response,next) =>{
    const respuestas = await prisma.respuesta.findMany({
        include:{
            usuario: true
        }
    })
    response.json(respuestas)
}

module.exports.getById = async(request,response,next) =>{
    let id = parseInt(request.params.id)
    const respuesta = await prisma.pregunta.findUnique({
        where:{id:id},
        include:{
            usuario:true
        }
    })
    response.json(respuesta)
}