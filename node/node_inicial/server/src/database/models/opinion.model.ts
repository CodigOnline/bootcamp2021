import * as Sequelize from "sequelize";
import {mysql} from "../mysql";

export enum EnumOpinionEstado {
    PENDIENTE,
    ACEPTADA,
    DENEGADA
}

export interface OpinionModel extends Sequelize.Model {
    id: number,
    idUsuario: number,
    descripcion: string,
    estado: EnumOpinionEstado
}

export interface NewOpinionModel {
    id?: number,
    idUsuario: number,
    descripcion: string,
    estado?: EnumOpinionEstado
}

export const Opinion = mysql.define<OpinionModel, NewOpinionModel>('opiniones', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    idUsuario:{
        type:Sequelize.INTEGER,
        allowNull:false,
        unique:true
    },
    descripcion:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    estado:{
        type:Sequelize.INTEGER,
        defaultValue:EnumOpinionEstado.PENDIENTE,
        allowNull:false
    }
},{underscored: true, timestamps: true})
// Opinion.belongsTo(Usuario)
