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
}



