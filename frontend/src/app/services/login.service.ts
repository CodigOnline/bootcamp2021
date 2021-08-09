import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UsuarioLogin, UsuarioLogueado} from "../entities/Login.model";
import {first} from "rxjs/operators";
import {ToastService} from "./toast.service";
import jwtDecode, {JwtPayload} from 'jwt-decode'
import {UsuarioToken} from "../entities/Usuario.model";
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private token: string | null = null
  private logged = false;
  private usuario: UsuarioToken | null = null

  constructor(private http: HttpClient, private toast: ToastService, private spinner: NgxSpinnerService) {
    const token = localStorage.getItem("token")
    if (token !== null) {
      this.token = token
      this.logged = true
      this.decodeToken()
    }
  }

  getToken() {
    return this.token
  }

  getLogged() {
    return this.logged
  }

  getUsuario() {
    return this.usuario
  }

  login(usuario: UsuarioLogin) {
    this.http.post<UsuarioLogueado>("http://localhost:3000/login", usuario)
      .pipe(first())
      .subscribe((data: UsuarioLogueado) => {
        this.spinner.hide();
        this.token = data.token
        localStorage.setItem("token", this.token)
        this.logged = true;
        this.decodeToken()
        this.toast.success("Has iniciado sesión con éxito")
      }, (() => {
        this.spinner.hide()
        this.toast.error("Error al iniciar sesión. Comprueba los datos")
      }))
  }

  cerrarSesion() {
    this.token = null;
    this.logged = false;
    localStorage.removeItem("token")
    this.toast.info("Has cerrado sesión con éxito")
  }

  decodeToken() {
    if (this.token !== null) {
      const decoded: UsuarioToken = jwtDecode(this.token)
      if (decoded != null) {
        console.log(decoded);
        this.usuario = {
          id: decoded.id,
          username: decoded.username,
          role: decoded.role,
          exp: decoded.exp * 1000 /** MULTIPLICAMOS POR MIL PARA PONER LOS MILISEGUNDOS**/
        }
        const hoy = new Date()
        /**
         * SI LUNES 16 es más grande que hoy NO cerramos sesión
         * EN CASO CONTRARIO LA CERRAMOS
         */
        if (hoy.getTime() > this.usuario.exp)
          this.cerrarSesion()
      }
    }
  }
}
