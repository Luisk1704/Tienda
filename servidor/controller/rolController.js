const { PrismaClient, Rol, } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  let listRoles = [];
  for (let element in Rol) {
    switch (element) {
      case Rol.ADMINISTRADOR:
        listRoles.unshift({
          ["id"]: element,
          ["nombre"]: "ADMINISTRADOR",
        });
        break;
      case Rol.CLIENTE:
        listRoles.unshift({
          ["id"]: element,
          ["nombre"]: "CLIENTE",
        });
        break;
      case Rol.VENDEDOR:
        listRoles.unshift({
          ["id"]: element,
          ["nombre"]: "VENDEDOR",
        });
      break;
      default:
        listRoles.unshift({ ["id"]: Rol.USUARIO, ["nombre"]: "USUARIO"});
        break;
    }
  }

  response.json(listRoles);
};

module.exports.getById = async (request, response, next) => {
  let id = request.params.id;
  let nombre = "";
  switch (Rol[id]) {
    case Rol.ADMINISTRADOR:
      nombre = "ADMINISTRADOR";
      break;
    case Rol.CLIENTE:
      nombre = "CLIENTE";
      break;
    case Rol.VENDEDOR:
      nombre = "VENDEDOR";
      break;
    case Rol.USUARIO:
      nombre = "USUARIO";
        break;
    default:
      nombre = "USUARIO";
      break;
  }
  let rol = { ["id"]: Rol[id], ["nombre"]: nombre };
  response.json(rol);
};