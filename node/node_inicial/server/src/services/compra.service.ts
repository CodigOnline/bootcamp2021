import {Compra, CompraModel} from "../database/models/compra.model";
import {CompraArticulos} from "../database/models/compra_articulos.model";
import {Articulo, ArticuloModel} from "../database/models/articulo.model";

export class CompraService {
    save(usuarioId: number, importe: number, formaDePago: number, gastosEnvio: number, articulos: CompraArticulo[]) {
        Compra.create({usuarioId, importe, formaDePago, gastosEnvio})
            .then((compra: CompraModel) => {
                articulos.forEach(articulo => {
                    Articulo.findByPk(articulo.id, {attributes: ['stock']})
                        .then((articuloBD: ArticuloModel | null) => {
                            if (articuloBD!.stock >= articulo.cantidad) {
                                CompraArticulos.create({
                                    compraId: compra.id,
                                    articuloId: articulo.id,
                                    cantidad: articulo.cantidad
                                }).then(() => {
                                    console.log("Compra_Articulos creado correctamente");
                                    Articulo
                                        .update({stock: (articuloBD!.stock - articulo.cantidad)},
                                            {where: {id: articulo.id}})
                                        .then(() => console.log("Artículo actualizado correctamente"))
                                        .catch((err: Error) => {
                                            console.log("Error al actualizar el artículo");
                                            console.log(err);
                                        })
                                })
                                    .catch((err: Error) => {
                                        console.log("Error al guardar la compra_articulo");
                                        console.log(err);
                                    })
                            } else {
                                // DEVOLVER UNA PROMESA CON UN ERROR Y EN ESA TIRAR LA BD HACIA ATRÁS
                                // ELIMINAR LA COMPRA
                                // ELIMINAR LOS COMPRAS_ARTICULOS
                                // SUMAR EL STOCK A LOS PRODUCTOS RESTADOS
                            }
                        })
                })

            })
            .catch((err: Error) => {
                console.log("Error al guardar la compra");
                console.log(err);
            })
    }

    findAll() {

    }
}

interface CompraArticulo {
    id: number,
    cantidad: number
}