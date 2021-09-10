import express from "express";
import {CompraService} from "../services/compra.service";


const service = new CompraService();

export function save(request: express.Request, response: express.Response) {
    const usuarioId = request.params.id;
    const {importe, formaDePago, gastosEnvio, articulos} = request.body;
    service.save(Number(usuarioId), Number(importe), Number(formaDePago), Number(gastosEnvio), articulos)
        .then(() => {
            response.json({msg: "Compra creada correctamente"})
        })
        .catch((err) => {
            response.status(500).json({msg: "Error al guardar la compra", err})
        })
}

export function findAll(_: express.Request, _1: express.Response) {

}