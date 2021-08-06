export interface Registro {
  nombre: string;
  username: string;
  password: string;
  email: string;
}

export interface Registrado {
  usuario: {
    estado: boolean;
    role: number;
    id: number;
    nombre: string;
    email: string;
    password: string;
    username: string;
    updatedAt: string;
    createdAt: string;
  }
}
