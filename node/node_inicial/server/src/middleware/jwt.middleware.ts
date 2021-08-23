import express from "express";
import * as jwt from 'jsonwebtoken';
import config from "../settings/config";
import {JwtPayload, VerifyErrors} from "jsonwebtoken";
import {EnumUsuarioRol} from "../database/models/usuario.model";

export function checkIsAdmin(request: express.Request, response: express.Response, next: express.NextFunction) {
    let token: string | undefined = request.get('Authorization')
    console.log(`TOKEN: ${token}`);
    if (token !== undefined) {
        //COMPROBAR SI EL USUARIO ES ADMIN O NO

        return jwt.verify(token, String(config.jwt.clave),
            function check(err: VerifyErrors | null, usuario: JwtPayload | undefined) {
                if (err) {
                    console.log(err);
                    return response.status(401).json({msg: "Token invalido"}) //<-- al ver un return salimos de la función
                }

                //COMPROBAR SI EL USUARIO ES ADMIN
                if (usuario !== undefined) {
                    if (usuario.role === EnumUsuarioRol.ADMIN) {
                        return next()
                    } else {
                        console.log("El usuario no tiene permisos para acceder a este recurso");
                        return response.status(401).json({msg: 'Token invalido'})
                    }
                }
            })


    } else {
        return response.status(401).json({msg: "No se ha encontrado ningún token"})
    }


}


export function checkUser(request: express.Request, response: express.Response, next: express.NextFunction) {
    //recuperar token
    let token: string | undefined = request.get('Authorization')
    console.log(token);
    if (token == undefined) {
        return response.status(401).json({msg: "No se ha encontrado ningún token"})
    }
    return jwt.verify(token, String(config.jwt.clave), (err: VerifyErrors | null, payload: JwtPayload | undefined) => {
        if (err) {
            console.log(err);
            return response.status(401).json({msg: "Token invalido"}) //<-- al ver un return salimos de la función
        }
        //IS ADMIN
        if (payload) { //CHECK de payload !== undefined
            if (payload.role === EnumUsuarioRol.ADMIN) {
                request.body.idUsuario = payload.id
                return next()
            }
            if (payload.id == request.params.idUsuario) {
                request.body.idUsuario = payload.id
                return next()
            }
            return response.status(401).json({msg: 'No tienes permisos'})
        } else {
            return response.status(401).json({msg: 'Token invalido'})
        }
    })
}


//funcion que llama a otra funcion, pero esta segunda función la programamos nostros
