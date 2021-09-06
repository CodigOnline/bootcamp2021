import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ToastService} from "../../../services/toast.service";
import {ArticuloService} from "../../../services/articulo.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ArticuloModel} from "../../../entities/Articulo.model";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {faCartPlus} from "@fortawesome/free-solid-svg-icons";
import {faShareSquare} from "@fortawesome/free-solid-svg-icons";
import {faCommentDots} from "@fortawesome/free-solid-svg-icons";
import {ShareArticuloComponent} from "../../navbar/articulos/share/share-articulo.component";
import {CartService} from "../../../services/cart.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-articulo-detalles',
  templateUrl: './articulo-detalles.component.html',
  styleUrls: ['./articulo-detalles.component.css']
})
export class ArticuloDetallesComponent implements OnInit {
  articulo: ArticuloModel
  faInfoCircle = faInfoCircle;
  faCartPlus = faCartPlus;
  faShareSquare = faShareSquare;
  faCommentDots = faCommentDots;
  backend = environment.backendImg
  constructor(
    private cartService: CartService,
    private bottomSheet: MatBottomSheet,
    public dialogRef: MatDialogRef<ArticuloDetallesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { articulo: ArticuloModel }) {
    this.articulo = data.articulo
  }

  ngOnInit(): void {
  }
  openSheet(articulo: ArticuloModel) {
    this.bottomSheet.open(ShareArticuloComponent, {
      data: {
        articulo: articulo
      }
    })
  }
  addToCart(articulo: ArticuloModel) {
    this.cartService.addArticulo(articulo);
  }


}
