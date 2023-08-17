const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
module.exports.verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  
  let token;
  if (typeof bearerHeader !== "undefined") {
    token = bearerHeader.split(" ")[1].trim().toString();
  } else {
    res.status(403).json({
      status: false,
      message: "Acceso denegado",
    });
  }
  if (token) {
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    const user = await prisma.usuario.findUnique({
      where: {
        correo: verify.correo,
      },
    });
    req.user = verify;
    next();
  }
};
exports.grantRole = function (roles) {
  return async (req, res, next) => {
    try {
      const bearerHeader = req.headers["authorization"];      
      let token;
      if (typeof bearerHeader !== "undefined") {
        token = bearerHeader.split("Bearer")[1].trim().toString();
      } else {
        res.status(403).json({
          status: false,
          message: "Acceso denegado",
        });
      }
      if (token) {
        const verify = jwt.verify(token, process.env.SECRET_KEY);
        console.log(verify)
        //!==
        if (roles.length && roles.indexOf(verify.rol)===-1 || !verify.estado) {
          return res.status(401).json({ message: "No autorizado" });
        }
        next();
      }
    } catch (error) {
      next(error);
    }
  };
};
