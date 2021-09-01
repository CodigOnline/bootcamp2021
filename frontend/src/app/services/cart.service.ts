import {Injectable} from '@angular/core';
import {CartModel} from "../entities/Cart.model";
import {ArticuloModel} from "../entities/Articulo.model";
import {ToastService} from "./toast.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  //LA LISTA DE LOS PRODUCTOS AÑADIDOS AL CARRITO COMO SU CANTIDAD
  //LAS FUNCIONES PARA CONTROLAR EL CARRITO AÑADIR, ELIMINAR, CONTAR NUMERO DE ELEMENTOS EN EL CARRITO

  //ARTÍCULO AÑADIDO
  //CANTIDAD DE VECES QUE SE HA AÑADIDO ESE ARTÍCULO
  //TOTAL DE LA COMPRA

  //DESCUENTO QUE TIENE LA COMPRA
  //IMPUESTOS QUE TIENE LA COMPRA

  private cart: CartModel;

  constructor(private toast: ToastService) {
    this.cart = {
      articulos: new Map<ArticuloModel, number>(),
      total: 0
    }
  }

  getCart() {
    return this.cart;
  }

  getNumeroArticulos() {
    //return this.cart.articulos.size //SOLO DEVOLVEMOS LA CANTIDAD DE ARTICULOS DIFERENTES
    let total = 0;
    this.cart.articulos.forEach((value: number) => {
      total += value;
    })
    return total;
  }

  addArticulo(articulo: ArticuloModel) {
    let cantidad = this.cart.articulos.get(articulo)
    //SI LO ENCUENTRA NOS DEVOLVERÁ LA CANTIDAD DE VECES QUE EXISTE EL ARTÍCULO EN EL MAPA
    //SI NO LO ENCUENTRA NOS DEVOLVERÁ UNDEFINED
    if (cantidad == undefined) {
      cantidad = 1;
    } else {
      cantidad += 1
    }
    if (cantidad <= articulo.stock) {
      this.toast.success("Artículo añadido correctamente")
      this.cart.articulos.set(articulo, cantidad)
      this.cart.total += articulo.precio;
    } else {
      this.toast.warning("No hay stock suficiente para añadir más veces este artículo")
    }
  }

  removeArticulo(articulo: ArticuloModel) {
    let cantidad = this.cart.articulos.get(articulo)! // La ! --> exige a que no sea undefined
    this.cart.total -= articulo.precio
    if (cantidad == 1) {
      this.cart.articulos.delete(articulo)
    } else {
      cantidad -= 1;
      this.cart.articulos.set(articulo, cantidad) //ACTUALIZAMOS EL CARRITO RESTANDO UN ARTÍCULO
    }
  }

}
