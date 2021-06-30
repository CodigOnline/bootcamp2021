//lista de usuarios

import {Usuario, UsuarioModel} from "../database/models/usuario.model";
import {Model} from "sequelize";

let usuarios: UsuarioModel[] = []

//findAll, findOneByID, update, delete, save
export class UsuarioService {
    findAll(): Promise<Model<any, any>[]> {
       return Usuario.findAll()
    }

    findOneById(id: number): UsuarioModel {
        return usuarios[id - 1];
    }

    removeOneById(id: number): boolean {
        let usuario = usuarios.filter(usuario => usuario.id === id)
        if (usuario.length === 0) {
            return false;
        }
        usuarios = usuarios.filter(usuario => usuario.id !== id)
        return true;
    }

    save(nombre: string, email: string, password: string, username: string) {
       Usuario.create({
           email,password,nombre,username
       })
    }

    update(id: number, nombre: string, email: string, password: string, username: string) {
        console.log(password);
        let usuario = usuarios.filter(usuario => usuario.id === id)[0]
        let pos = usuarios.indexOf(usuario)
        if (nombre) //if (nombre!==undefined)
            usuario.nombre = nombre;
        if (email)
            usuario.email = email;
        if (username)
            usuario.username = username;
        //usuarios[pos]=usuario;
        usuarios.splice(pos, 1, usuario)
    }
}



