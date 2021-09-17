import {Usuario, UsuarioModel} from "../database/models/usuario.model";
import * as jwt from 'jsonwebtoken';
import config from "../settings/config";
import bcrypt from "bcrypt";

export class LoginService {
    login(email: string, password: string): Promise<ResultLogin> {
        // select limit 1 * from usuarios where email=info@codigonline.com
        return Usuario.findOne({where: {email}})
            .then((usuario: UsuarioModel | null) => {
                if (usuario === null) {
                    return {resultado: false, msg: `No se ha encontrado con el usuario con el email ${email}`}; //QUE NO ES UN TOKEN
                }
                const checkPassword = bcrypt.compareSync(password, usuario.password)
                if (!checkPassword) {
                    return {
                        resultado: false,
                        msg: `La contraseña del usuario ${email} no coincide con la establecida en la bd`
                    };//QUE NO ES UN TOKEN
                }
                let token = jwt.sign(
                    {id: usuario.id, username: usuario.username, nombre: usuario.nombre, role: usuario.role},
                    String(config.jwt.clave),
                    {expiresIn: '7d'}
                )
                return {resultado: true, msg: token}; //NOS DEVOLVERÁ UN TOKEN
            })
            .catch((err: Error) => {
                return {resultado: false, msg: err.message}; //QUE NO ES UN TOKEN
            })


    }
}

export interface ResultLogin {
    resultado: boolean,
    msg: string
}
