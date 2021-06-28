import {Router} from "express";
import {
    findAll, findOneById, remove, save, update
} from "../controllers/usuarios.controller";


const router = Router();

// /usuarios/
router.route('/')
    .get(findAll)
    .post(save);
// /usuarios/1/
router.route('/:idUsuario')
    .get(findOneById)
    .put(update)
    .delete(remove)

export default router;

