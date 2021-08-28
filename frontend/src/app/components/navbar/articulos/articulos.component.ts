import {Component, OnInit} from '@angular/core';
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";
import {GeneratedStyles} from "../../../utils/animate";
import {ArticuloService} from "../../../services/articulo.service";
import {ArticuloModel} from "../../../entities/Articulo.model";
import {LoginService} from "../../../services/login.service";
import {faEdit} from "@fortawesome/free-regular-svg-icons";
import {faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {faCartPlus} from "@fortawesome/free-solid-svg-icons";
import {faShareSquare} from "@fortawesome/free-solid-svg-icons";
import {faCommentDots} from "@fortawesome/free-solid-svg-icons";
import {MatDialog} from "@angular/material/dialog";
import {ArticuloFormComponent} from "./articulo-form/articulo-form.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {ShareArticuloComponent} from "./share/share-articulo.component";


@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css'],
  animations: [
    trigger('ngForAnimation', [
      transition('* <=> *', [
        query(':enter', [
          style({opacity: 0}), //ESTADO INICIAL TRANSPARENTE
          stagger('50ms', //EJECUCiÓN DE LA ANIMACIÓN
            animate('500ms ease', GeneratedStyles.Animations.backInRight)
          )
        ], {optional: true}),
      ])
    ])
  ]
})

export class ArticulosComponent implements OnInit {
  editar = faEdit;
  faTrash = faTrashAlt
  faInfoCircle = faInfoCircle;
  faCartPlus = faCartPlus;
  faShareSquare = faShareSquare;
  faCommentDots = faCommentDots;
  articulos: ArticuloModel[] = []
  hoy = new Date()

  constructor(private articuloService: ArticuloService,
              private loginService: LoginService,
              public dialog: MatDialog,
              private bottomSheet: MatBottomSheet) {
  }

  ngOnInit(): void {
    this.articuloService.getArticulos()
      .subscribe(data => {
        console.log(data);
        this.articulos = data
      })
  }

  openDialog(articulo?: ArticuloModel) {
    if (!articulo) {
      articulo = {} as ArticuloModel
    }
    console.log(articulo);
    const dialogRef = this.dialog.open(ArticuloFormComponent, {
      data: {
        articulo: articulo
      },
      width: '80%',
      height: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openSheet(articulo: ArticuloModel) {
    this.bottomSheet.open(ShareArticuloComponent, {
      data: {
        articulo: articulo
      }
    })
  }

  isAdmin() {
    return this.loginService.isAdmin();
  }

  remove(id: number) {
    console.log("Has clicado el boton eliminar para el id: " + id);
    this.articuloService.delete(id)
  }
}
