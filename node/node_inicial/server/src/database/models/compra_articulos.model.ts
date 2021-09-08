import * as Sequelize from "sequelize"
import {mysql} from "../mysql";
import {Compra} from "./compra.model";
import {Articulo} from "./articulo.model";

export interface CompraArticulosModel extends Sequelize.Model {
    articuloId: number,
    compraId: number,
    cantidad: number
}

export interface NewCompraArticulo {
    articuloId: number,
    compraId: number,
    cantidad: number
}

export const CompraArticulos = mysql.define<CompraArticulosModel, NewCompraArticulo>('compra_articulos', {
    compraId: {
        type: Sequelize.INTEGER,
        references: {model: Compra, key: 'id'}
    },
    articuloId: {
        type: Sequelize.INTEGER,
        references: {model: Articulo, key: 'id'}
    },
    cantidad: Sequelize.INTEGER
}, {
    underscored: true,
    timestamps: false
})

Compra.belongsToMany(Articulo, {through:CompraArticulos});
Articulo.belongsToMany(Compra,{through: CompraArticulos});
