import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {first} from "rxjs/operators";
import {ArticuloModel, ArticuloModelResponse} from "../entities/Articulo.model";

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

 /* private articulos: ArticuloModel[] = []

  getArticulos() {
    return this.articulos;
  }
*/
  constructor(private http: HttpClient) {}

  findAll() { //PETICIONES ASYNCRONAS
    return this.http.get<ArticuloModelResponse>(`${environment.backend}/articulos`)
  }

  //PETICIONES PARA ADMINS!!
  save(){}
  update(){}
  delete(){}
}
