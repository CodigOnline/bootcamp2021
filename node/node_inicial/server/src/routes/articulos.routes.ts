import {Router} from "express";
import {findAll, findOneById, remove, save, update, upload} from "../controllers/articulos.controller";
import {checkIsAdmin} from "../middleware/jwt.middleware";
import config from "../middleware/img_articulos.middleware";

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


