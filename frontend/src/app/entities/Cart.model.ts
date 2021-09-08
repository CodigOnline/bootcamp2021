import {ArticuloModel} from "./Articulo.model";

export interface CartModel {
  //TODOS LOS ARTÍCULOS QUE HAY EN EL CARRITO
  //LA CANTIDAD DE ARTÍCULOS QUE HAY PARA CADA UNO DE ELLOS
  //PAN 3 UNIDADES 1€
  //AGUA 5 UNIDADES 0,5€
  //JABÓN 1 UNIDAD 3€
  //BOLI 1 UNIDAD
  articulos: Map<ArticuloModel, number> //MAPA K V
  totalPrecio: number,
  totalArticulos: number;
  envio: number

}
