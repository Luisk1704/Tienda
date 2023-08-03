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

module.exports.create = async(request,response,next) => {
    let Pregunta = request.body
    const nuevaPregunta =  await prisma.pregunta.create({
        data: {
          usuarioId: parseInt(Pregunta.usuarioId),
          descripcion: Pregunta.descripcion,        
          ropaId: parseInt(Pregunta.ropaId)
        }
      })
    response.json(nuevaPregunta)
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