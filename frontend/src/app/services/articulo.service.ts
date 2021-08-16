import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {first} from "rxjs/operators";
import {ArticuloModel, ArticuloModelResponse} from "../entities/Articulo.model";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  //PARA GUARDAR LOS DATOS QUE HEMOS RECIBIDO
  //LA LISTA PRIVADA DE ARTICULOS QUE HEMOS RECUPERADO DEL SERVIDOR

  // private list:ArticuloModel[]= []; NO LA PODEMOS UTILIZAR PORQUE SIEMPRE NOS DEVUELVE []
  private articulos:BehaviorSubject<ArticuloModel[]> = new BehaviorSubject<ArticuloModel[]>([])

  getArticulos(){
    this.checkLast()
    return this.articulos.asObservable() //CONVERTIMOS LA LISTA EN OBSERVABLE PARA RECUPERARLA EN OTRO SITIO
  }
  constructor(private http: HttpClient) {
    this.findAll()
  }

  private findAll() { //PETICIONES ASYNCRONAS
    this.http.get<ArticuloModelResponse>(`${environment.backend}/articulos`)
      .pipe(first())
      .subscribe(data=>{
        console.log(data);
        this.articulos.next(data.articulos) //ENVIAR A LA LISTA PRIVADA LA RESPUESTA DEL SERVIDOR
      })
  }
  private checkLast(){
    // RECUPERAR LA ULTIMA ACTUALIZACIÓN DE LOS DATOS
  }

  //PETICIONES PARA ADMINS!!
  save(){}
  update(){}
  delete(){}
}
