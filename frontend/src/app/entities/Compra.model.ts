import {CompraArticuloModel} from "./CompraArticuloModel";

export interface CompraModel {
  importe: number,
  formaDePago: number,
  gastosEnvio: number,
  articulos: CompraArticuloModel[]
}
