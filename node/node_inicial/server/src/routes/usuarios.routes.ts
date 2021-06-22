import {Router} from "express";
import {actualizarUsuario, crearUsuario, getOneUser, getUsuarios} from "../controllers/usuarios.controller";


const router = Router();

// /usuarios/
router.route('/')
    .get(getUsuarios)
    .post(crearUsuario);
// /usuarios/1/
router.route('/1')
    .get(getOneUser)
    .put(actualizarUsuario);

export default router;

