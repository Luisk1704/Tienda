const { PrismaClient, Prisma } = require('@prisma/client')
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
            descuento: 0,
            IV: 0.13,
            estado: 'pendiente',
            subtotal: pedido.subtotal,
            Total: pedido.Total,
            ropas:{
                createMany:{
                    //[{videojuegoId, cantidad}]
                    data: pedido.ropas
                }
            }
        }
    })
    response.json(crear)
}

module.exports.update = async (request, response, next) => {
    let pedido = request.body;
    let idpedido = parseInt(request.params.id);
    //Obtener pedido viejo
  
    const nuevopedido =  await prisma.pedido.update({
        where:{id: idpedido},
        data: {
          estado: pedido.estado
        },
      })
    response.json(nuevopedido);
  };

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

module.exports.getVentaProductoMes = async (request, response, next) => {
    let mes = parseInt(request.params.mes); 
    const result = await prisma.$queryRaw(Prisma.sql`SELECT r.nombre as ropa, pv.nombre as marca, SUM(pr.cantidad) as suma 
    FROM pedido p, pedidoropa pr, ropa r, proveedor pv 
    WHERE p.id=pr.idPedido and pr.idRopa=r.id AND MONTH(p.fechaOrden) =${mes} AND r.proveedorId = pv.id GROUP BY pr.idRopa limit 5`)
    //const result = await prisma.$queryRaw(Prisma.sql`SELECT v.nombre, SUM(ov.cantidad) as suma FROM orden o, ordenonvideojuego ov, videojuego v WHERE o.id=ov.ordenId and ov.videojuegoId=v.id AND MONTH(o.fechaOrden) =${mes} GROUP BY ov.videojuegoId`)
    response.json(result)
};

module.exports.getTopVendedores = async (request, response, next) => { 
    const result = await prisma.$queryRaw(Prisma.sql`SELECT u.nombre as usuario, e.nota as nota
    FROM usuario u, evaluacion e 
    WHERE u.id = e.usuarioId and e.usuarioRol = 'VENDEDOR'  group by u.id
    order by e.nota desc limit 5`)
    //const result = await prisma.$queryRaw(Prisma.sql`SELECT v.nombre, SUM(ov.cantidad) as suma FROM orden o, ordenonvideojuego ov, videojuego v WHERE o.id=ov.ordenId and ov.videojuegoId=v.id AND MONTH(o.fechaOrden) =${mes} GROUP BY ov.videojuegoId`)
    response.json(result)
};

module.exports.getTopPeores = async (request, response, next) => {
    let mes = parseInt(request.params.mes); 
    const result = await prisma.$queryRaw(Prisma.sql`SELECT u.nombre as usuario, e.nota as nota
    FROM usuario u, evaluacion e 
    WHERE u.id = e.usuarioId and e.usuarioRol = 'VENDEDOR'  group by u.id
    order by e.nota asc limit 5`)
    //const result = await prisma.$queryRaw(Prisma.sql`SELECT v.nombre, SUM(ov.cantidad) as suma FROM orden o, ordenonvideojuego ov, videojuego v WHERE o.id=ov.ordenId and ov.videojuegoId=v.id AND MONTH(o.fechaOrden) =${mes} GROUP BY ov.videojuegoId`)
    response.json(result)
};

module.exports.getMasVendido = async (request, response, next) => {
    let id = parseInt(request.params.id); 
    const result = await prisma.$queryRaw(Prisma.sql`SELECT r.nombre as ropa, pv.nombre as marca ,sum(pr.cantidad) as suma
    FROM tiendaropa.usuario u, tiendaropa.ropa r, tiendaropa.pedidoropa pr, tiendaropa.proveedor pv
    WHERE pr.idRopa = r.id and r.vendedorId = ${id} and r.vendedorId = u.id and r.proveedorId = pv.id group by pr.idRopa
    order by suma desc limit 3`)
    //const result = await prisma.$queryRaw(Prisma.sql`SELECT v.nombre, SUM(ov.cantidad) as suma FROM orden o, ordenonvideojuego ov, videojuego v WHERE o.id=ov.ordenId and ov.videojuegoId=v.id AND MONTH(o.fechaOrden) =${mes} GROUP BY ov.videojuegoId`)
    response.json(result)
};

module.exports.getMejorCliente = async (request, response, next) => { 
    let id = parseInt(request.params.id); 
    const result = await prisma.$queryRaw(Prisma.sql`SELECT u.nombre as usuario, sum(pr.cantidad) as suma
    FROM usuario u, pedidoropa pr, pedido p, ropa r
    WHERE pr.idRopa = r.id and r.vendedorId = ${id} and pr.idPedido = p.id and p.clienteId = u.id  group by p.clienteId
    order by suma desc limit 3`)
    //const result = await prisma.$queryRaw(Prisma.sql`SELECT v.nombre, SUM(ov.cantidad) as suma FROM orden o, ordenonvideojuego ov, videojuego v WHERE o.id=ov.ordenId and ov.videojuegoId=v.id AND MONTH(o.fechaOrden) =${mes} GROUP BY ov.videojuegoId`)
    response.json(result)
};

module.exports.getVentaProductoTop = async (request, response, next) => {
    const result = await prisma.$queryRaw(Prisma.sql`SELECT r.nombre, (SUM(pr.cantidad)*r.precio) as total FROM pedido p, pedidoropa pr, ropa r WHERE p.id=pr.idPedido and pr.idRopa=r.id GROUP BY pr.idRopa ORDER BY total DESC`)
  
    //SELECT v.nombre, (SUM(ov.cantidad)*v.precio) as total FROM orden o, ordenonvideojuego ov, videojuego v WHERE o.id=ov.ordenId and ov.videojuegoId=v.id GROUP BY ov.videojuegoId ORDER BY total DESC;
    response.json(result)
  };