const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports.get = async(request,response,next) => {
    const pedidos = await prisma.pedido.findMany()
    response.json(pedidos)
}

module.exports.crear = async(request,response,next) =>{
    let pedido = request.body
    const crear = await prisma.pedido.create({
        data:{
            idPago: pedido.idPago,
            clienteId: pedido.clienteId,
            direccionId: pedido.direccionId, 
            descuento: 0.12,
            IV: 0.13,
            estado: 'pendiente',
            subtotal: pedido.subtotal,
            Total: pedido.Total,
            ropas:{
                connect: pedido.ropas
            }
        }
    })
}

module.exports.getByIdvendedor = async(request,response,next) => {
    let id = parseInt(request.params.id)
    const pedido = await prisma.pedido.findMany({      
        where:{
            ropas:{
                some:{
                    ropa:{
                        vendedorId: id
                    }
                }
            }
        },
        include: {            
            ropas:  {
                include:{
                    ropa:{
                        include:{
                            categorias: true,
                            vendedor: true
                        }
                    }
                }
            },
            metodo: true
        },
    })
    response.json(pedido)
}



module.exports.getByIdcliente = async(request,response,next) => {
    let id = parseInt(request.params.id)
    const pedido = await prisma.pedido.findMany({      
        where:{
            clienteId:id
        },
        include: {
            metodo: true,
            ropas:  {
                include:{
                    ropa:{
                        include:{
                            categorias: true,
                            vendedor:true
                        }
                    }
                }
            }
        }
    })
    response.json(pedido)
}

module.exports.getById = async(request,response,next) => {
    let id = parseInt(request.params.id)
    const pedido = await prisma.pedido.findUnique({
        where: {id:id},
        include: {
            metodo: true,
            direccion: true,
            ropas:  {
                include:{
                    ropa:{
                        include:{
                            categorias: true,
                            proveedor: {
                                select:{
                                    nombre: true
                                }
                            }
                        }
                    }
                }
            },
            usuario:true
        }
    })
    response.json(pedido)
}