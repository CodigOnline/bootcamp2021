import {Component, OnInit} from '@angular/core';
import {RegistroService} from "../../services/registro.service";
import {LoginService} from "../../services/login.service";
import {CartService} from "../../services/cart.service";

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
    }, {
      path: '/opiniones',
      nombre: "Opiniones",
      icon: 'O'
    }
  ]
  numArticulo = 0;

  constructor(private loginService: LoginService, private cartService: CartService) {
  }

  ngOnInit(): void {
    console.log("Iniciando navbar...");
    this.numArticulo = this.cartService.getNumeroArticulos()
  }

  isLogged() {
    return this.loginService.getLogged()
  }

  cerrarSesion() {
    this.loginService.cerrarSesion();
  }

  getUsuario() {
    return this.loginService.getUsuario()
  }
}

interface Ruta {
  path: string,
  nombre: string,
  icon: string
}
