import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Registrado, Registro} from "../entities/Registro.model";
import Swal from "sweetalert2";
import {ToastService} from "./toast.service";

@Injectable()
export class RegistroService {

  constructor(private httpClient: HttpClient, private toast:ToastService) {
  }
  registrar(registro:Registro){
    this.httpClient.post<Registrado>('http://localhost:3000/usuarios', registro).toPromise()
      .then(data => {
        console.log(data.usuario.nombre);
        this.toast.success(`${data.usuario.nombre} registrado correctamente`)
      })
      .catch(err => {
        console.log(err);
      });
  }
}
