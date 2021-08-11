import express from "express";
import * as jwt from 'jsonwebtoken';
import {UsuarioService} from "../services/usuario.service";
import {UsuarioModel} from "../database/models/usuario.model";
import {JwtPayload} from "jsonwebtoken";

let usuarioService = new UsuarioService()

export function findAll(_: express.Request, response: express.Response) {
    usuarioService.findAll()
        .then((usuarios: UsuarioModel[]) => {
            return response.json({usuarios})
        })//estado correcto
        .catch((err: Error) => {
            return response.status(500).json({
                msg: 'Error en la recuperación de los datos.',
                error: err
            })
        })
}

export function findOneById(request: express.Request, response: express.Response) {
    let id = request.params.idUsuario
    const token = request.get('Authorization');
    if (token) {
        let decoded: JwtPayload | null = jwt.decode(token, {json: true})
        if (decoded) {
            console.log(decoded.id);


        }
    }

    usuarioService.findOneById(Number(id))
        .then((usuario: UsuarioModel | null) => {
            if (usuario === null) {
                return response.status(404).json({msg: `No se ha encontrado el usuario con el id ${id}`})
            }
            return response.json({usuario})
        })
        .catch((err: Error) => {
            return response.status(500).json({
                msg: 'Error en la recuperación de los datos.',
                error: err
            })
        })

}

export function remove(request: express.Request, response: express.Response) {
    let id: string = request.params.idUsuario
    usuarioService.removeOneById(Number(id))
        .then((num: number) => {
            if (num === 0) {
                return response.status(404).json({msg: `No se ha encontrado el usuario con el id ${id}`})
            }
            return response.json({msg: `El usuario con el id ${id} se ha eliminado correctamente`})
        })
        .catch((err: Error) => {
            return response.status(500).json({
                msg: 'Error en la eliminación de los datos.',
                error: err
            })
        })
}

export function save(request: express.Request, response: express.Response) {
    //const body: NewUsuarioModel = request.body;
    /*    const nombre = request.body.nombre;
        const email = request.body.email;
        const password = request.body.password;
        const username = request.body.username;*/


    const {nombre, email, password, username} = request.body;


    if (username === undefined || email === undefined || password === undefined || nombre === undefined) {
        return response.status(400).json({
            msg: 'Revisa los datos enviados.'
        })
    }
    return usuarioService.save(nombre, email, password, username)
        .then((usuario: UsuarioModel) => {
            return response.json({usuario})
        })
        .catch((err: Error) => {
            return response.status(500).json({
                msg: 'Error en el guardado de los datos.',
                error: err
            })
        })

}

export function update(request: express.Request, response: express.Response) {
    //PARAMS BODY
    const id = request.params.idUsuario;
    const {nombre, email, username} = request.body;
    usuarioService.update(Number(id), nombre, email, username)
        .then((actualizados: [number, any]) => {
            const [filas, _] = actualizados
            if (filas === 0) {
                return response.status(404).json({msg: `No se ha encontrado el usuario con el id ${id}`})
            }
            return response.json({msg: 'Datos actualizados correctamente'})
        })
        .catch((err: Error) => {
            return response.status(500).json({
                msg: 'Error en la actualización de los datos.',
                error: err
            })
        })
    //response.status(501).send("Este método no está implementando, prueba más tarde")
}

export function changeToAdmin(request: express.Request, response: express.Response) {
    const id = request.params.idUsuario;
    usuarioService.changeToAdmin(id)
        .then(() => {
            response.json({msg: "Usuario actualizado a Admin"})
        })
        .catch((err: Error) => {
            return response.status(500).json({
                msg: 'Error en la actualización de los datos.',
                error: err
            })
        })
}
