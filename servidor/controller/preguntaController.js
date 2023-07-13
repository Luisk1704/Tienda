const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

module.exports.get = async(request,response,next) =>{
    const preguntas = await prisma.pregunta.findMany({
        include:{
            usuario: true
        }
    })
    response.json(preguntas)
}

module.exports.getById = async(request,response,next) =>{
    let id = parseInt(request.params.id)
    const pregunta = await prisma.pregunta.findUnique({
        where:{id:id},
        include:{
            usuario:true
        }
    })
    response.json(pregunta)
}