import {Compra, CompraModel} from "../database/models/compra.model";
import {CompraArticulos} from "../database/models/compra_articulos.model";
import {Articulo, ArticuloModel} from "../database/models/articulo.model";
import {mysql} from "../database/mysql";
import {Transaction} from "sequelize";

/*import {Usuario} from "../database/models/usuario.model";*/

export class CompraService {
    save(usuarioId: number, importe: number, formaDePago: number, gastosEnvio: number, articulos: CompraArticulo[]) {
        return mysql.transaction((t: Transaction) => {
            return Compra.create({usuarioId, importe, formaDePago, gastosEnvio}, {transaction: t})
                .then((compra: CompraModel) => {
                    return new Promise<string>(async (resolve, reject) => { //RESOLVE HA ACABADO BIEN REJECT HA ACABADO MAL
                        let error = false;
                        for (let i = 0; i < articulos.length && !error; i++) {
                            const articulo = articulos[i];
                            console.log(`ARTICULO => ${articulo.id}`);
                            await Articulo.findByPk(articulo.id, {attributes: ['stock'], transaction: t})
                                .then(async (articuloBD: ArticuloModel | null) => {
                                    //AQUI TERMINA EL 1R AWAIT
                                    if (articuloBD!.stock >= articulo.cantidad) {
                                        await CompraArticulos.create({
                                            compraId: compra.id,
                                            articuloId: articulo.id,
                                            cantidad: articulo.cantidad
                                        }, {transaction: t}).then(async () => {
                                            console.log("Compra_Articulos creado correctamente");
                                            await Articulo
                                                .update({stock: (articuloBD!.stock - articulo.cantidad)},
                                                    {where: {id: articulo.id}, transaction: t})
                                                .then(() => {
                                                    console.log("Artículo actualizado correctamente")
                                                })
                                                .catch((err: Error) => {
                                                    console.log("Error al actualizar el artículo");
                                                    console.log(err);
                                                    error = true;
                                                    return reject("Error al actualizar el artículo")
                                                })
                                        })
                                            .catch((err: Error) => {
                                                console.log("Error al guardar la compra_articulo");
                                                console.log(err);
                                                error = true;
                                                return reject("Error al guardar la compra_articulo")
                                            })
                                    } else {
                                        console.log(`No hay stock del artículo ${articulo.id}`);
                                        error = true;
                                        return reject(`No hay stock del artículo ${articulo.id}`)
                                    }
                                })
                        }

                        return resolve("OK");
                    })
                })
        })

    }

    findAll(usuarioId: number) {
        /*return Compra.findAll({
             where: {usuarioId},
             attributes:['id','importe','gastosEnvio','fecha','formaDePago'],
             include: {model: Usuario, attributes:['nombre', 'email']}
         })*/
        return Compra.findAll({
            where: {usuarioId},
            attributes: ['id', 'importe', 'gastosEnvio', 'fecha', 'formaDePago'],
            include: {
                model: Articulo, attributes: ['nombre', 'descripcion', 'foto','precio'],
                through: {attributes: ['cantidad']}
            }
        })
    }
}

interface CompraArticulo {
    id: number,
    cantidad: number
}