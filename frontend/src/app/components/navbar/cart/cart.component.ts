import {Component, OnInit} from '@angular/core';
import {CartService} from "../../../services/cart.service";
import {CartModel} from "../../../entities/Cart.model";
import {ArticuloModel} from "../../../entities/Articulo.model";
import {faPlusCircle, faMinusCircle} from "@fortawesome/free-solid-svg-icons";
import {ArticuloDetallesComponent} from "../../shared/articulo-detalles/articulo-detalles.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;
  cart: CartModel

  constructor(private cartService: CartService, public dialog: MatDialog) {
    this.cart = {
      articulos: new Map<ArticuloModel, number>(),
      totalPrecio: 0,
      totalArticulos: 0
    }
  }

  ngOnInit(): void {
    console.log("Entrando al componente...");
    this.cartService.cartSubject.subscribe(cart => this.cart = cart)

  }

  addArticulo(articulo: ArticuloModel) {
    this.cartService.addArticulo(articulo)
  }

  removeArticulo(articulo: ArticuloModel) {
    this.cartService.removeArticulo(articulo)
  }

  abrirDetalles(articulo: ArticuloModel) {
    const dialogRef = this.dialog.open(ArticuloDetallesComponent, {
      data: {
        articulo: articulo
      },
      width: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
