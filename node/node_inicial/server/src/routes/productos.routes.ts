import {Router} from "express";
import {actualizarUsuario, crearUsuario, getOneUser, getUsuarios} from "../controllers/usuarios.controller";


const router = Router();

// /productos/
router.route('/')
    .get(getUsuarios)
    .post(crearUsuario);
// /productos/1/
router.route('/1')
    .get(getOneUser)
    .put(actualizarUsuario);

export default router;

