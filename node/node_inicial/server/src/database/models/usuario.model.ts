export interface UsuarioModel {
    id: number;
    email: string;
    nombre: string;
    password: string,
    username: string;
    role: EnumUsuarioRol;
}

export enum EnumUsuarioRol {
    ADMIN,
    USER
}
