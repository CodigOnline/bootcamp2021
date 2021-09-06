import * as Sequelize from "sequelize";
import {mysql} from "../mysql";
import {Usuario} from "./usuario.model";

export enum FormaDePago {
    TPV,
    PAYPAL,
    BITCOIN,
    EFECTIVO
}

export interface CompraModel extends Sequelize.Model {
    id: number,
    usuarioId: number,
    importe: number,
    formaDePago: FormaDePago,
    fecha: Date,
    gastosEnvio: number

}

export interface NewCompraModel {
    id?: number,
    usuarioId: number,
    importe: number,
    formaDePago: FormaDePago,
    fecha: Date,
    gastosEnvio: number
}

export const Compra = mysql.define<CompraModel, NewCompraModel>('compras', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuarioId: Sequelize.INTEGER,
    importe: Sequelize.FLOAT,
    formaDePago: {
        type: Sequelize.INTEGER,
        defaultValue: FormaDePago.EFECTIVO,
        allowNull: false
    },
    fecha: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
        allowNull: false
    },
    gastosEnvio: {
        type: Sequelize.INTEGER,
        defaultValue: 5,
        allowNull: false
    }

}, {underscored: true, timestamps: true})


Usuario.hasMany(Compra, {foreignKey: 'usuario_id', sourceKey: 'id'})
Compra.belongsTo(Usuario, {foreignKey: 'usuario_id', targetKey: 'id'})