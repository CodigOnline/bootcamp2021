import {Component, OnInit} from '@angular/core';
import {CartService} from "../../../services/cart.service";
import {CartModel} from "../../../entities/Cart.model";
import {ArticuloModel} from "../../../entities/Articulo.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: CartModel

  constructor(private cartService: CartService) {
    this.cart = {
      articulos: new Map<ArticuloModel, number>(),
      total: 0
    }
  }

  ngOnInit(): void {
    console.log("Entrando al componente...");
    this.cart = this.cartService.getCart();
  }

  addArticulo(articulo: ArticuloModel) {
    this.cartService.addArticulo(articulo)
  }

  removeArticulo(articulo: ArticuloModel) {
    this.cartService.removeArticulo(articulo)
  }

}
