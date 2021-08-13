import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UsuarioLogin, UsuarioLogueado} from "../entities/Login.model";
import {filter, finalize, first, map, take, tap} from "rxjs/operators";
import {ToastService} from "./toast.service";
import jwtDecode from 'jwt-decode'
import {UsuarioToken} from "../entities/Usuario.model";
import {NgxSpinnerService} from "ngx-spinner";
import {environment} from "../../environments/environment";

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
/*
    let obvs = of(1, 2, 3, 4, 5, 6) //ES COMO SI EL SERVER (BACKEND) ME DEVOLVIESE ESTOS 6 NÚMEROS
    obvs.pipe(
      tap(num => {
        console.log("TAP NUM:" + num);
      }), //SOLO LO UTILIZAMOS PARA MOSTRAR DATOS
      filter(num => num > 5),
      take(2),

      map(num => "Número recibido: " + num),
      finalize(() => {
        console.log("Se han recibido todos los datos");
      })
    )
      .subscribe((data) => {
        console.log(data);
      })

    this.spinner.hide();*/
    this.http.post<UsuarioLogueado>(`${environment.backend}/login`, usuario)
      .pipe(first())
      .subscribe((data: UsuarioLogueado) => {
        this.token = data.token
        localStorage.setItem("token", this.token)
        this.logged = true;
        this.decodeToken()
        this.toast.success("Has iniciado sesión con éxito")
      })

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
