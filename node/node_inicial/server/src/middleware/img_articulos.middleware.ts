import multer from "multer";

const almacenamiento = multer.diskStorage({
    destination: function (_:Express.Request,_1:Express.Multer.File,callback){
        callback(null,'public/articulos/imagenes')
    },
    filename(_:Express.Request,file:Express.Multer.File,callback) {
        callback(null,file.originalname)
    }
})


const config =  multer({
    storage:almacenamiento,
    limits:{
        fileSize:2000000
    },
    fileFilter(_: Express.Request, file: Express.Multer.File, callback: multer.FileFilterCallback) {
        if (!file.originalname.match("^.+.(jpg|jpeg|png|gif)$")){
            callback(new Error("El formato de la imagen no está admitido en el servidor"))
        }
        callback(null,true)
    }
})
export default config;