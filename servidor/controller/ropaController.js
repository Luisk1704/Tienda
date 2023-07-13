const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports.get = async(request,response,next) => {
    const ropas = await prisma.ropa.findMany({
        include: {
            proveedor: {
                select:{
                    nombre: true
                }
            },            
            categorias: {
                select:{
                    descripcion: true
                }
            },
            fotos:{
                select:{
                    foto: true
                }
            }
        }
    })
    response.json(ropas)
}

module.exports.getByVendedor = async(request,response,next) => {
    let vendedor = parseInt(request.params.id)
    const ropas = await prisma.ropa.findMany({
        where:{
            usuarios:{
                some:{
                    id: vendedor
                }
            }
        }, 
        include: {
            proveedor: {
                select:{
                    nombre: true
                }
            },            
            categorias: {
                select:{
                    descripcion: true
                }
            },
            usuarios: {
                select:{
                    nombre: true
                }
            }
        }
    })
    response.json(ropas)
}

module.exports.getByID = async(request,response,next) => {
    let id = parseInt(request.params.id)
    const ropa = await prisma.ropa.findUnique({
        where: {id:id},
        include: {
            categorias: {
                select:{
                    descripcion: true
                }
            },
            proveedor: {
                select:{
                    nombre: true
                }
            },
            preguntas:{
                select:{
                    descripcion: true,
                    respuestas:{
                        select:{
                            descripcion: true
                        }
                    }
                }                
            },
            fotos:{
                select:{
                    foto: true
                }
            }
        }
    })
    response.json(ropa)
}