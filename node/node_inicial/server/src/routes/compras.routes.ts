import {Router} from "express";
import {findAll, save} from "../controllers/compra.controller";
import {checkUser} from "../middleware/jwt.middleware";


const router = Router();

router.route("/:id")
    .post(checkUser, save)
    .get(checkUser, findAll)

export default router;