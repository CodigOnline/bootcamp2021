import {CompraArticuloModel} from "./CompraArticuloModel";

export interface CompraModel {
  importe: number,
  formaDePago: number,
  gastosEnvio: number,
  articulos: CompraArticuloModel[]
}

export interface ComprasModelResponse {
  compras: CompraModelResponse[]
}

export interface CompraModelResponse {
  id: number,
  importe: number,
  gastosEnvio: number,
  fecha: Date,
  formaDePago: number,
  articulos: CompraArticuloModelResponse[]
}

export interface CompraArticuloModelResponse {
  nombre: string,
  descripcion: string,
  foto: string,
  precio: number,
  compra_articulos: {
    cantidad: number
  }
}
