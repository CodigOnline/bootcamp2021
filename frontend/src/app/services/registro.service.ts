import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Registrado, Registro} from "../entities/Registro.model";

@Injectable()
export class RegistroService {

  constructor(private httpClient: HttpClient) {
  }
  registrar(registro:Registro){
    this.httpClient.post<Registrado>('http://localhost:3000/usuarios', registro).toPromise()
      .then(data => {
        console.log(data.usuario.nombre);
        alert('Usuario regidstrado correctamente')
      })
      .catch(err => {
        console.log(err);
      });
  }
}
