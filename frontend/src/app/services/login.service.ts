import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UsuarioLogin, UsuarioLogueado} from "../entities/Login.model";
import {first} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private token: string | null = null
  private logged = false;

  getToken() {
    return this.token
  }

  getLogged() {
    return this.logged
  }

  constructor(private http: HttpClient) {
  }

  login(usuario: UsuarioLogin) {
    this.http.post<UsuarioLogueado>("http://localhost:3000/login", usuario)
      .pipe(first())
      .subscribe((data: UsuarioLogueado) => {
        console.log(data.token);
        this.token = data.token
        this.logged = true;
        alert("Has iniciado sesión")
      })
  }
}
