import express from "express";
import {OpinionesService} from "../services/opiniones.service";
import * as jwt from "jsonwebtoken";
import config from "../settings/config";
import {JwtPayload, VerifyErrors} from "jsonwebtoken";

const service = new OpinionesService()

export function findAll(request: express.Request, response: express.Response) {
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
            return service.findAll(Number(payload.role))!
                .then(opiniones => {
                    return response.json({opiniones})
                })
                .catch((err: Error) => {
                    return response.status(500).json({
                        msg: 'Error en la busqueda de las opiniones',
                        error: err
                    })
                })
        } else
            return response.status(401).json({msg: "Token invalido"}) //<-- al ver un return salimos de la función
    })
}

export function save(request: express.Request, response: express.Response) {
    const {descripcion} = request.body
    const idUsuario = request.params.idUsuario
    if (descripcion == undefined || descripcion == '' || idUsuario == undefined || idUsuario == '') {
        return response.status(500).json({
            msg: 'Error en los datos enviados',
        })
    }
    return service.save(Number(idUsuario), descripcion)
        .then(opinion => {
            return response.json({opinion})
        })
        .catch((err: Error) => {
            return response.status(500).json({
                msg: 'Error en el guardado de la opinion',
                error: err
            })
        })
}

export function update(request: express.Request, response: express.Response) {
    const {id, descripcion} = request.body
    const idUsuario = request.params.idUsuario;
    if (descripcion == undefined || descripcion == '' || idUsuario == undefined || idUsuario == '' || id == undefined || id == '') {
        return response.status(500).json({
            msg: 'Error en los datos enviados',
        })
    }
    return service.update(Number(id), Number(idUsuario), descripcion)
        .then((actualizados: [number, any]) => {
                const [filas, _] = actualizados
                if (filas === 0) {
                    return response.status(404).json({msg: `No se ha encontrado el usuario con el id ${id}`})
                }
                return response.json({msg: 'Opinion actualizada correctamente'})
            }
        )
        .catch((err: Error) => {
            return response.status(500).json({
                msg: 'Error en el guardado de la opinion',
                error: err
            })
        })
}

export function remove(request: express.Request, response: express.Response) {
    const idUsuario = request.params.idUsuario
    service.delete(Number(idUsuario))
        .then((num: number) => {
            if (num === 0) {
                return response.status(404).json({msg: `No se ha encontrado el usuario con el id ${idUsuario}`})
            }
            return response.json({msg: `La opinion del usuario ${idUsuario} se ha eliminado correctamente`})
        })
        .catch((err: Error) => {
            return response.status(500).json({
                msg: 'Error en el eliminado de la opinion',
                error: err
            })
        })
}

export function visualizar(request: express.Request, response: express.Response) {
    const estado = Number(request.params.estado);
    const idOpinion = Number(request.params.idOpinion);
    switch (estado) {
        case 1:
            service.aceptarOpinion(idOpinion)
                .then((actualizados: [number, any]) => {
                        const [filas, _] = actualizados
                        if (filas === 0) {
                            return response.status(404).json({msg: `No se ha encontrado la opinion con el id ${idOpinion}`})
                        }
                        return response.json({msg: 'Opinion actualizada correctamente'})
                    }
                ).catch((err: Error) => {
                return response.status(500).json({
                    msg: 'Error en el guardado de la opinion',
                    error: err
                })
            })
            break;
        case 2:
            service.denegarOpinion(idOpinion)
                .then((actualizados: [number, any]) => {
                        const [filas, _] = actualizados
                        if (filas === 0) {
                            return response.status(404).json({msg: `No se ha encontrado la opinion con el id ${idOpinion}`})
                        }
                        return response.json({msg: 'Opinion actualizada correctamente'})
                    }
                ).catch((err: Error) => {
                return response.status(500).json({
                    msg: 'Error en el guardado de la opinion',
                    error: err
                })
            })
            break;
    }
}
