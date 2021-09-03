import {Router} from "express";
import {findAll, findOneById, remove, save, update, upload} from "../controllers/articulos.controller";
import {checkIsAdmin} from "../middleware/jwt.middleware";
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
const router = Router();
router.route('/')
    .get(findAll) // todos --> NO EXISTE EL MIDDLEWARE
    .post(checkIsAdmin, save) //ADMIN --> MIDDLEWARE check el usuario tiene el rol correspondiente a admin

router.route('/upload')
    .post(checkIsAdmin,config.single('imagen'),upload)

router.route('/:id') //ID PUEDE TENER CUALQUIER VALOR INCLUSIVE UPLOAD
    .get(findOneById) // todos --> NO EXISTE EL MIDDLEWARE
    .put(checkIsAdmin, update) //ADMIN --> MIDDLEWARE check el usuario tiene el rol correspondiente a admin
    .delete(checkIsAdmin, remove)//ADMIN --> MIDDLEWARE check el usuario tiene el rol correspondiente a admin


export default router;


