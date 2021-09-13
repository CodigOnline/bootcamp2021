import express from "express";
import {CompraService} from "../services/compra.service";


const service = new CompraService();

export function save(request: express.Request, response: express.Response) {
    const usuarioId = request.params.idUsuario;
    const {importe, formaDePago, gastosEnvio, articulos} = request.body;
    service.save(Number(usuarioId), Number(importe), Number(formaDePago), Number(gastosEnvio), articulos)
        .then(() => {
            response.json({msg: "Compra creada correctamente"})
        })
        .catch((err) => {
            response.status(500).json({msg: "Error al guardar la compra", err})
        })
}

export function findAll(request: express.Request, response: express.Response) {

    const usuarioId = request.params.idUsuario;
    service.findAll(Number(usuarioId))
        .then((compras) => response.json({compras}))
        .catch((err) => {
            response.status(500).json({msg: `Error al recuperar las compras del usuario ${usuarioId}`, err})
        })
}