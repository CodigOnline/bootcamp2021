import {Router} from "express";
import {
    findAll, findOneById, remove, save, update
} from "../controllers/usuarios.controller";
import {checkIsAdmin, checkUser} from "../middleware/jwt.middleware";


const router = Router();

// /usuarios/
router.route('/')
    .get(checkIsAdmin, findAll)
    .post(save);
// /usuarios/1/
router.route('/:idUsuario') //el admin o el usuario con el mismo id en su token que el solicitado en el parametro
    .get(checkUser, findOneById)
    .put(checkUser, update)
    .delete(checkUser, remove)

/*router.route('/toAdmin/:idUsuario')
    .put(checkIsAdmin,changeToAdmin)*/
export default router;

