import {Router} from "express";
import {login} from "../controllers/login.controller";


const router = Router();
router.route('/') // POST /login/ --> CUALQUIERA
    .post(login)
export default router;
