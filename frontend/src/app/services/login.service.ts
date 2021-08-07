import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UsuarioLogin, UsuarioLogueado} from "../entities/Login.model";
import {first} from "rxjs/operators";
import {ToastService} from "./toast.service";
import jwtDecode, {JwtPayload} from 'jwt-decode'
import {UsuarioToken} from "../entities/Usuario.model";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private token: string | null = null
  private logged = false;
  private usuario: UsuarioToken | null = null

  constructor(private http: HttpClient, private toast: ToastService) {
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
        console.log(data.token);
        this.token = data.token
        this.logged = true;
        this.decodeToken()
        this.toast.success("Has iniciado sesión con éxito")
      })
  }

  cerrarSesion() {
    this.token = null;
    this.logged = false;
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
          role: decoded.role
        }
        console.log(this.usuario);
      }
    }
  }
}
