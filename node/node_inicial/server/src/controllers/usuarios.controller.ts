import express from "express";
import {UsuarioService} from "../services/usuario.service";

let usuarioService = new UsuarioService()

export async function findAll(_: express.Request, response: express.Response) {
    let usuarios = await usuarioService.findAll()
    response.send(usuarios);
}

export function findOneById(request: express.Request, response: express.Response) {
    let id = request.params.idUsuario
    let usuario = usuarioService.findOneById(Number(id))
    if (usuario === undefined) {
        return response.status(404).json({
            result: 'KO',
            msg: `No se ha encontrado el usuario con el id ${id}`
        })
    }
    return response.json({
        result: 'OK',
        usuario
    })
}

export function remove(request: express.Request, response: express.Response): express.Response {
    let id:string = request.params.idUsuario
    let deleted:boolean = usuarioService.removeOneById(Number(id));
    if (deleted) {
        return response.json({
            result: 'OK',
            msg: `El usuario con el id ${id} se ha eliminado correctamente`
        })
    }
    return response.json({
        result: 'KO',
        msg: `No se ha encontrado el usuario con el id ${id}`
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
            result: 'KO',
            msg: 'Revisa los datos enviados.'
        })
    }
    usuarioService.save(nombre, email, password, username)
    response.send("OK")

}

export function update(request: express.Request, response: express.Response): express.Response {
    //PARAMS BODY
    const id = request.params.idUsuario;
    const {nombre, email, password, username} = request.body;
    usuarioService.update(Number(id), nombre, email, password, username);
    return response.send("update ok");
    //response.status(501).send("Este método no está implementando, prueba más tarde")
}
