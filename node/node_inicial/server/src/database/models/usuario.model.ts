import * as Sequelize from "sequelize";
import {mysql} from "../mysql";
import {Opinion} from "./opinion.model";

export interface UsuarioModel extends Sequelize.Model {
    id: number;
    email: string;
    nombre: string;
    password: string,
    username: string;
    estado: boolean;
    role: EnumUsuarioRol;
    resetPasswordToken: string | null;
    resetPasswordExpiress: string | null
}

export enum EnumUsuarioRol {
    ADMIN,
    USER
}

export interface NewUsuarioModel {
    id?: number;
    email: string;
    nombre: string;
    password: string,
    username: string;
    estado?: boolean;
    role?: EnumUsuarioRol;
    resetPasswordToken?: string | null;
    resetPasswordExpiress?: string | null
}

export const Usuario = mysql.define<UsuarioModel, NewUsuarioModel>('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    estado: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    role: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false
    },
    resetPasswordToken: {
        type: Sequelize.STRING,
        allowNull: true
    },
    resetPasswordExpiress: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {underscored: true, timestamps: true})

Usuario.hasOne(Opinion, {
    onDelete: 'CASCADE',
    foreignKey: 'id_usuario'
})
Opinion.belongsTo(Usuario, {foreignKey: 'id_usuario'})
