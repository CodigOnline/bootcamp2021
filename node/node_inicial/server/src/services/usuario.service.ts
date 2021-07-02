//lista de usuarios

import {Usuario, UsuarioModel} from "../database/models/usuario.model";

//findAll, findOneByID, update, delete, save
export class UsuarioService {
    findAll(): Promise<UsuarioModel[]> {
        return Usuario.findAll()
    }

    findOneById(id: number): Promise<UsuarioModel | null> {
        return Usuario.findByPk(id)
    }

    removeOneById(id: number): Promise<number> {
        return Usuario.destroy({where: {id}})
    }

    save(nombre: string, email: string, password: string, username: string) {
        return Usuario.create({
            nombre, email, password, username
        })
    }

    update(id: number, nombre: string, email: string, username: string): Promise<[number, any]> {
        return Usuario.update(
            {nombre: nombre, email: email, username: username},
            {where: {id: id}}
        )
    }
}



