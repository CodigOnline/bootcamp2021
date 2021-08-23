import {Router} from "express";
import {findAll, remove, save, update, visualizar} from "../controllers/opiniones.controller";
import {checkIsAdmin, checkUser} from "../middleware/jwt.middleware";


const router = Router()

router.route('/')
    .get(findAll);
router.route('/:idUsuario')
    .post(checkUser, save)
    .put(checkUser, update)
    .delete(checkUser, remove)

router.route('/admin/:idOpinion/:estado')
    .put(checkIsAdmin,visualizar)

export default router
