import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {first} from "rxjs/operators";
import {
  ArticuloModel,
  ArticuloModelResponse,
  ArticulosModelResponse,
  DeleteArticuloResponse
} from "../entities/Articulo.model";
import {BehaviorSubject} from "rxjs";
import {ToastService} from "./toast.service";
import {MatDialogRef} from "@angular/material/dialog";
import {ArticuloFormComponent} from "../components/navbar/articulos/articulo-form/articulo-form.component";

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private foto: any | null = null;

  //PARA GUARDAR LOS DATOS QUE HEMOS RECIBIDO
  //LA LISTA PRIVADA DE ARTICULOS QUE HEMOS RECUPERADO DEL SERVIDOR

  // private list:ArticuloModel[]= []; NO LA PODEMOS UTILIZAR PORQUE SIEMPRE NOS DEVUELVE []
  private articulos: BehaviorSubject<ArticuloModel[]> = new BehaviorSubject<ArticuloModel[]>([])

  getArticulos() {
    this.checkLast()
    return this.articulos.asObservable() //CONVERTIMOS LA LISTA EN OBSERVABLE PARA RECUPERARLA EN OTRO SITIO
  }

  constructor(private http: HttpClient, private toast: ToastService) {
    this.findAll()
  }

  private findAll() { //PETICIONES ASYNCRONAS
    this.http.get<ArticulosModelResponse>(`articulos`)
      .pipe(first())
      .subscribe(data => {
        console.log(data);
        this.articulos.next(data.articulos) //ENVIAR A LA LISTA PRIVADA LA RESPUESTA DEL SERVIDOR
      })
  }

  private checkLast() {
    // RECUPERAR LA ULTIMA ACTUALIZACIÓN DE LOS DATOS
  }

  //PETICIONES PARA ADMINS!!
  save(articulo: ArticuloModel, ref: MatDialogRef<ArticuloFormComponent>) {
    this.http.post<ArticuloModelResponse>('articulos', articulo) //peticion post sirve para crear algo //articulos--> http://localhost:3000/articulos
      .pipe(first())
      .subscribe((data) => {
        this.uploadFoto();
        this.toast.success(data.msg)
        this.articulos.value.push(data.articulo)
        this.articulos.next(this.articulos.value)
        ref.close()
      })
  }

  update(articulo: ArticuloModel, ref: MatDialogRef<ArticuloFormComponent>) {
    this.http.put(`articulos/${articulo.id}`, articulo)
      .pipe(first())
      .subscribe((data: any) => {
        this.uploadFoto();
        this.toast.success(data.msg)
        //ACTUALIZAR EN EL BEHAVIOUR SUBJECT
        /*
        1- BUSCAR EL OBJETO A REEMPLAZAR
        2- REEMPLAZAR EL OBJECTO
         */
        /*
        const encontrado = this.articulos.value.filter(filtro => filtro.id === articulo.id)[0]
        const pos = this.articulos.value.indexOf(encontrado)
        this.articulos.value[pos] = articulo
        this.articulos.next(this.articulos.value)*/
        const newList = this.articulos.value.map(value => {
          if (value.id === articulo.id) {
            value = articulo
          }
          return value
        })
        this.articulos.next(newList)
        ref.close()
      })
  }

  delete(id: number) {
    this.http.delete<DeleteArticuloResponse>(`articulos/${id}`)
      .pipe(first())
      .subscribe((data: DeleteArticuloResponse) => {
        this.toast.success(data.msg)


        const articulosFiltrados = this.articulos.value.filter(articulo => articulo.id !== id) //ELIMINADO EL ARTICULO DE LA LISTA
        console.log(articulosFiltrados);
        this.articulos.next(articulosFiltrados) //PARTE MÁS IMPORTANTE
      })
  }

  uploadFoto() {
    if (this.foto !== null) {
      const formData = new FormData();
      formData.append("imagen", this.foto)

      this.http.post('articulos/upload', formData)
        .pipe(first())
        .subscribe((data) => {
          console.log("Imagen subida correctamente");
          this.setFoto(null)
        })
    }
  }

  setFoto(foto: any) {
    this.foto = foto;
  }

  restarStock(id: number, cantidad: number) {
    const newList = this.articulos.value.map(value => {
      if (value.id === id) {
        value.stock -= cantidad
      }
      return value
    })
    this.articulos.next(newList)
  }
}
