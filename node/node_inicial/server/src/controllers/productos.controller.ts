import express from "express";

export function getUsuarios(request: express.Request, response: express.Response) {
    console.log(request.params);
    response.send("Estas haciendo una petición get a la lista de usuarios. Lamento comentarte que no tenemos BD.")
}
export function getOneUser(request: express.Request, response: express.Response){
    console.log(request.params);
    response.send("Estas haciendo una petición get a un usuario. Lamento comentarte que no tenemos BD.")
}
export function crearUsuario(request: express.Request, response: express.Response){
    console.log(request.params);
    response.send("Estas haciendo una petición post para crear un usuario. Lamento comentarte que no tenemos BD.")
}
export function actualizarUsuario(request: express.Request, response: express.Response){
    console.log(request.params);
    response.send("Estas haciendo una petición put para actualizar un usuario. Lamento comentarte que no tenemos BD.")
}

