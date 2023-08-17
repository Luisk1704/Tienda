const { PrismaClient, Rol } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require("jsonwebtoken");
//--npm install bcrypt
const bcrypt = require("bcrypt");

//Crear nuevo usuario
module.exports.register = async (request, response, next) => {
  const userData = request.body;
  console.log(userData.rol)

  //Salt es una cadena aleatoria.
  //"salt round" factor de costo controla cuánto tiempo se necesita para calcular un solo hash de BCrypt
  // salt es un valor aleatorio y debe ser diferente para cada cálculo, por lo que el resultado casi nunca debe ser el mismo, incluso para contraseñas iguales
  let salt= bcrypt.genSaltSync(10);
  // Hash password
  let hash=bcrypt.hashSync(userData.contrasenna,salt);
  const user = await prisma.usuario.create({
    data: {
      nombre: userData.nombre,
      cedula: userData.cedula,
      telefono: userData.telefono,
      correo: userData.correo,
      contrasenna: hash,
      estado: true,
      rol: Rol[userData.rol]
    },
    
  });
  response.status(200).json({
    status: true,
    message: "Usuario creado",
    data: user,
  });
};

module.exports.login = async (request, response, next) => {
  let userReq = request.body;
  //Buscar el usuario según el email dado
  const user = await prisma.usuario.findUnique({
    where:{
        correo: userReq.correo,
    }
  })
  //Sino lo encuentra según su email
  if (!user) {
    response.status(401).send({
      success: false,
      message: "Usuario no registrado",
      data: ''
    });
  }
  //Verifica la contraseña
  const checkPassword=await bcrypt.compare(userReq.contrasenna, user.contrasenna);
  console.log(checkPassword)
  if(checkPassword === false){
    response.status(401).send({
      success:false,
      message: "Credenciales no validas",
    })
  }else{
    //Usuario correcto
    //Crear el payload
    const payload={
      correo: user.correo,
      rol: user.rol,
      estado: user.estado
    }
    //Crear el token
    const token= jwt.sign(payload,process.env.SECRET_KEY,{
      expiresIn: process.env.JWT_EXPIRE
    });
    response.json({
      success: true,
      message: "Usuario registrado",
      data: {
        user,
        token,
      }
    })
  }
};


module.exports.get = async(request,response,next) => {
    const usuarios = await prisma.usuario.findMany({})
    response.json(usuarios)
}

module.exports.getById = async(request,response,next) => {
    let Id = parseInt(request.params.id)
    const usuario = await prisma.usuario.findUnique({
        where: {id:Id}
    })
    response.json(usuario)
}

module.exports.update = async (request, response, next) => {
  let usuario = request.body;
  let idusuario = parseInt(request.params.id);
  //Obtener usuario viejo

  const nuevoUsuario =  await prisma.usuario.update({
      where:{id: idusuario},
      data: {
        estado: usuario.estado
      },
    })
  response.json(nuevoUsuario);
};