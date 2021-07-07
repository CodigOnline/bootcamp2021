import express from "express";
import {LoginService, ResultLogin} from "../services/login.service";

const loginService = new LoginService()

export function login(request: express.Request, response: express.Response) {

    const {email, password} = request.body
    loginService.login(email, password)
        .then((result: ResultLogin) => {
            if (!result.resultado)
                return response.status(403).json({msg: result.msg})
            return response.json({token: result.msg})
        })


}
