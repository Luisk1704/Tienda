const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: 'uploads',
    filename:(req,file,cb)=>{
        cb(null,uuid()+path.extname(file.originalname()))
    },
    
})


var upload = multer({storage}) 
module.exports = upload