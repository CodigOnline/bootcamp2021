//lista de usuarios

import {EnumUsuarioRol, UsuarioModel} from "../database/models/usuario.model";

let usuarios: UsuarioModel[] = []

for (let i = 1; i <= 20; i++) {
    let usuario: UsuarioModel = {
        id: i,
        nombre: `Usuario${i}`,
        email: `usuario${i}@codigonline.com`,
        password: '123456789',
        role: EnumUsuarioRol.USER,
        username: `usuario_${i}`
    }
    usuarios.push(usuario)
}

//findAll, findOneByID, update, delete, save
export class UsuarioService {
    findAll(): UsuarioModel[] {
        //INSTRUCCIONES PARA EL BUSCAR TODOS DE MYSQL
        return usuarios;
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
        let usuario: UsuarioModel = {
            id: usuarios.length + 1,
            nombre,
            email,
            password,
            username,
            role: EnumUsuarioRol.USER
        }
        usuarios.push(usuario)
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



