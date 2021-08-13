import {Component, OnInit} from '@angular/core';
import {animate, query, stagger, style, transition, trigger, useAnimation} from "@angular/animations";
import {lightSpeedIn} from "ng-animate";
import {GeneratedStyles} from "../../../utils/animate";
import {ArticuloService} from "../../../services/articulo.service";
import {ArticuloModel} from "../../../entities/Articulo.model";
import {first} from "rxjs/operators";

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
            animate('2s ease', GeneratedStyles.Animations.backInRight)
          )
        ], {optional: true}),
      ])
    ])
  ]
})

export class ArticulosComponent implements OnInit {

  articulos: ArticuloModel[] = []

  constructor(private articuloService: ArticuloService) {
  }

  ngOnInit(): void {
    this.articuloService.findAll()
      .pipe(first())
      .subscribe(data => {
        console.log(data.articulos);
        this.articulos = data.articulos
      })
  }
}
