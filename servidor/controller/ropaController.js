const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports.create = async(request,response,next) => {
    let Ropa = request.body
    const nuevaRopa =  await prisma.ropa.create({
        data: {
          nombre: Ropa.nombre,
          cantidad: parseInt(Ropa.cantidad),        
          proveedorId: Ropa.proveedorId,        
          precio: parseFloat(Ropa.precio),
          vendedorId: parseInt(Ropa.vendedorId),
          estado: Ropa.estado,
          categorias: {
            connect: Ropa.categorias
          }
        }
      })
    response.json(nuevaRopa)
}

module.exports.update = async (request, response, next) => {
    let ropa = request.body;
    let idRopa = parseInt(request.params.id);
    //Obtener ropa viejo
    const ropaVieja = await prisma.ropa.findUnique({
        where: {id:idRopa},
        include: {
            categorias: {
                select:{
                    id: true
                }
            }
        }
    });
  
    const nuevaRopa =  await prisma.ropa.update({
        where:{id: idRopa},
        data: {
          nombre: ropa.nombre,
          cantidad: parseInt(ropa.cantidad),        
          proveedorId: ropa.proveedorId,        
          precio: parseFloat(ropa.precio),
          vendedorId: parseInt(ropa.vendedorId),
          estado: ropa.estado,
          categorias: {
            disconnect: ropaVieja.categorias,
            connect: ropa.categorias
          }
        }
      })
    response.json(nuevaRopa);
  };

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
            vendedorId: vendedor
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
            vendedor:{
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
                    id: true,
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
                    id: true,
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
                    id: true,
                    foto: true
                }
            }
        }
    })
    response.json(ropa)
}

