import {Router} from "express";
import {findAll, findOneById, remove, save, update} from "../controllers/articulos.controller";



const router = Router();
router.route('/')
    .get(findAll)
    .post(save)

router.route('/:id')
    .get(findOneById)
    .put(update)
    .delete(remove)

export default router;


