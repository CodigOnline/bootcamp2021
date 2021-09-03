import express from "express";
import {ArticuloService} from "../services/articulo.service";
import {ArticuloModel} from "../database/models/articulo.model";


const articuloService = new ArticuloService();

export function findAll(_: express.Request, response: express.Response) {
    articuloService.findAll()
        .then((articulos: ArticuloModel[]) => response.json({articulos}))
        .catch((err: Error) => {
            console.log('No se han podido recuperar los datos de la BD');
            console.log(err);
            return response.json({msg: 'No se han podido recuperar los datos de la BD', err})
        })
}

export function findOneById(request: express.Request, response: express.Response) {
    const id = request.params.id;
    articuloService.findOneById(Number(id))
        .then((articulo: ArticuloModel | null) => {
            if (articulo === null) {
                return response.json({msg: `No se ha encontrado el articulo con el id ${id}`})
            }
            return response.json({articulo}
            )
        })
        .catch((err: Error) => {
            console.log(`No se han podido recuperar el articulo con el id ${id} de la BD`);
            console.log(err);
            return response.json({msg: 'No se han podido recuperar los datos de la BD', err})
        })
}

export function save(request: express.Request, response: express.Response) {
    const {nombre, descripcion, stock, observaciones, referencia, precio, categoria, peso, foto} = request.body
    articuloService.save(nombre, descripcion, stock, observaciones, referencia, precio, categoria, peso, foto)
        .then((articulo: ArticuloModel) => response.json({articulo, msg: 'Articulo creado correctamente'}))
        .catch((err: Error) => {
            console.log(`No se han podido insertar el articulo`);
            console.log(err);
            return response.json({msg: 'No se han podido insertar el articulo', err})
        })
}

export function update(request: express.Request, response: express.Response) {
    const id = request.params.id
    const {nombre, descripcion, stock, observaciones, referencia, precio, categoria, peso, foto} = request.body
    articuloService.update(Number(id), nombre, descripcion, stock, observaciones, referencia, precio, categoria, peso, foto)
        .then((data: [number, any]) => {
            const [filas,] = data;
            if (filas === 0) {
                return response.json({msg: `No se ha encontrado el artículo con el id ${id}`})
            }
            return response.json({msg: 'Articulo actualizado correctamente'})
        })
        .catch((err: Error) => {
            console.log(`No se han podido actualizar el articulo`);
            console.log(err);
            return response.json({msg: 'No se han podido actualizar el articulo', err})
        })

    /*
    1 recuepero datos del params --> OK
    2 recupero dartos del body --> OK
    3 llamo al service --> OK
    <-- 4 lanzamiento Articulo.update
    5 devuelvo resultado --> return response.json({msg: `No se ha encontrado el artículo con el id ${id}`})
    6 devuelvo resultado --> return response.json({msg: 'No se han podido actualizar el articulo', err})




     */
}

export function remove(request: express.Request, response: express.Response) {
    const id = request.params.id
    articuloService.remove(Number(id))
        .then((filas: number) => {
            if (filas === 0) {
                return response.json({msg: `No se ha encontrado el artículo con el id ${id}`})
            }
            return response.json({msg: `Artículo con el id ${id} eliminado correctamente`})
        })
        .catch((err: Error) => {
            console.log(`No se han podido eliminar el articulo`);
            console.log(err);
            return response.json({msg: 'No se han podido eliminar el articulo', err})
        })
}

export function upload(request:express.Request,response:express.Response){

    const fichero = request.file;
    if (!fichero){
        return response.status(400).json({msg:'Error al subir la imagen'})
    }
    return response.json({
        fichero
    })
}
