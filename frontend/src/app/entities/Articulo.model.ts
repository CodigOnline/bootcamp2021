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

export interface ArticulosModelResponse {
  articulos: ArticuloModel[]
}

export interface ArticuloModelResponse {
  articulo: ArticuloModel,
  msg: string
}

export interface DeleteArticuloResponse {
  msg: string
}
