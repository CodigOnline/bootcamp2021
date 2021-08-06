import {Component, OnInit} from '@angular/core';
import {RegistroService} from "../../services/registro.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  rutas: Ruta[] = [
    {
      path: '/articulos',
      nombre: "Artículos",
      icon: 'A'
    },
    {
      path: '/test',
      nombre: "Test",
      icon: 'T'
    }, {
      path: '/opiniones',
      nombre: "Opiniones",
      icon: 'O'
    }
  ]


  constructor() {
  }

  ngOnInit(): void {

  }

}

interface Ruta {
  path: string,
  nombre: string,
  icon: string
}
