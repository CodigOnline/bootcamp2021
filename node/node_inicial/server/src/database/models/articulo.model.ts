import * as Sequelize from "sequelize";
import {mysql} from "../mysql";

export interface ArticuloModel extends Sequelize.Model {
    id: number,
    nombre: string,
    descripcion: string,
    stock: number,
    observaciones: string
    referencia: string
    precio: number,
    categoria: string,
    peso: number,
    consumible: boolean
    foto: string
}

export interface NewArticuloModel {
    id?: number,
    nombre: string,
    descripcion: string,
    stock: number,
    observaciones?: string
    referencia: string
    precio: number,
    categoria: string,
    peso: number,
    consumible?: boolean
    foto: string
}

export const Articulo = mysql.define<ArticuloModel, NewArticuloModel>('articulos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descripcion: {
        type: Sequelize.STRING(2500),
        allowNull: false,
    },
    stock: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    observaciones: {
        type: Sequelize.STRING,
        allowNull: true
    },
    referencia: {
        type: Sequelize.STRING,
        allowNull: false
    },
    precio: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    categoria: {
        type: Sequelize.STRING,
        allowNull: false
    },
    peso: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    consumible: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    foto: {
        type: Sequelize.STRING,
        allowNull: false
    }


}, {underscored: true,timestamps: true})
