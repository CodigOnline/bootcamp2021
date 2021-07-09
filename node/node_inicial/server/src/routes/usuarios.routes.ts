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
router.route('/:idUsuario') //el admin o el usuario con el mismo id en su token que el solicitado en el parametro
    .get(findOneById)
    .put(update)
    .delete(remove)

export default router;

