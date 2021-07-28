import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-opiniones',
  templateUrl: './opiniones.component.html',
  styleUrls: ['./opiniones.component.css']
})
export class OpinionesComponent implements OnInit {

  articulos: Articulo[] = []

  constructor() {
  }

  ngOnInit(): void {
    this.articulos = [
      {
        id: 1,
        nombre: "Producto 1",
        descripcion: "Clear fights lead to the urchin.",
        precio: 3.47,
        vendido:true
      }, {
        id: 2,
        nombre: "Producto 2",
        descripcion: "Damn yer son, feed the jolly roger. .",
        precio: 6.37,
        vendido:false
      }, {
        id: 3,
        nombre: "Producto 3",
        descripcion: "Clear fights lead to the urchin.",
        precio: 8.45,
        vendido:true
      }, {
        id: 4,
        nombre: "Producto 4",
        descripcion: "Clear fights lead to the urchin.",
        precio: 2.67,
        vendido:false
      }, {
        id: 5,
        nombre: "Producto 5",
        descripcion: "Clear fights lead to the urchin.",
        precio: 9.87,
        vendido: false
      }
    ]
    this.articulos = this.articulos.filter(articulo => articulo.precio > 5)
  }


}

interface Articulo {
  id: number,
  nombre: string,
  descripcion: string,
  precio: number
  vendido: boolean
}
