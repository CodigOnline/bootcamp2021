import express from "express";
import {LoginService, ResultLogin} from "../services/login.service";

const loginService = new LoginService()

export function login(request: express.Request, response: express.Response) {

    const {email, password} = request.body
    if (email == undefined || email == '' || password == undefined || password == '') {
        return response.status(400).json({
            msg: "Error en los datos enviados"
        })
    }
    console.log("EMAIL: " + email);
    console.log("Password: " + password);
    return loginService.login(email, password)
        .then((result: ResultLogin) => {
            if (!result.resultado)
                return response.status(403).json({msg: result.msg})
            return response.json({token: result.msg})
        })


}
