import express from "express";
import {UsuarioService} from "../services/usuario.service";

let usuarioService = new UsuarioService()

export function findAll(_: express.Request, response: express.Response) {
    let usuarios = usuarioService.findAll();
    response.send(usuarios);
}
export function findOneById(request: express.Request, response: express.Response){
    let id = request.params.idUsuario
    let usuario = usuarioService.findOneById(Number(id))
    if (usuario===undefined){
        return response.json({
            result:'KO',
            msg:`No se ha encontrado el usuario con el id ${id}`
        })
    }
    return response.json({
        result:'OK',
        usuario
    })
}
export function remove(request: express.Request, response: express.Response) {
    let id = request.params.idUsuario
    let deleted = usuarioService.removeOneById(Number(id));
    if (deleted){
        return response.json({
            result:'OK',
            msg: `El usuario con el id ${id} se ha eliminado correctamente`
        })
    }
    return response.json({
        result:'KO',
        msg:`No se ha encontrado el usuario con el id ${id}`
    })

}
export function save(request: express.Request, response: express.Response){
    console.log(request.params);
    response.send("Estas haciendo una petición post para crear un usuario. Lamento comentarte que no tenemos BD.")
}
export function update(request: express.Request, response: express.Response){
    console.log(request.params);
    response.send("Estas haciendo una petición put para actualizar un usuario. Lamento comentarte que no tenemos BD.")
}
