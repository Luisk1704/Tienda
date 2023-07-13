const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports.get = async(request,response,next) => {
    const pedidos = await prisma.pedido.findMany()
    response.json(pedidos)
}

module.exports.getByIdvendedor = async(request,response,next) => {
    let id = parseInt(request.params.id)
    const pedido = await prisma.pedido.findMany({      
        where:{
            ropas:{
                some:{
                    ropa:{
                        usuarios:{
                            some:{
                                id:id
                            }
                        }
                    }
                }
            }
        },
        include: {
            compras:{
                include:{
                    usuario:true,
                    metodos:true
                }
            },
            ropas:  {
                include:{
                    ropa:{
                        include:{
                            categorias: true,
                            usuarios:true
                        }
                    }
                }
            }
        }
    })
    response.json(pedido)
}

module.exports.getByIdcliente = async(request,response,next) => {
    let id = parseInt(request.params.id)
    const pedido = await prisma.pedido.findMany({      
        where:{
            compras:{
                some:{
                    clienteId:id
                }
            }
        },
        include: {
            compras:{
                include:{
                    usuario:true,
                    metodos:true
                }
            },
            ropas:  {
                include:{
                    ropa:{
                        include:{
                            categorias: true,
                            usuarios:true
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
            compras:{
                include:{
                    usuario:{
                        include:{
                            direcciones:true
                        }
                    },
                    metodos:true
                }
            },
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
            }
        }
    })
    response.json(pedido)
}