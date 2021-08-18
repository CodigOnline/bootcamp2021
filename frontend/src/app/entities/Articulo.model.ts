export interface ArticuloModel {
  id?: number,
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

export interface ArticuloModelResponse {
  articulos: ArticuloModel[]
}

export interface DeleteArticuloResponse {
  msg: string
}
