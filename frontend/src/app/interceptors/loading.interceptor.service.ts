import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";
import {finalize} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptorService implements HttpInterceptor {

  private numPeticiones = 0;

  constructor(private spinner: NgxSpinnerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.numPeticiones == 0)
      this.spinner.show()
    this.numPeticiones++;

    console.log("Petición saliente hacia el back");//SALIDA
    //COMUNICACIÓN DE ANGULAR CON BACK

    return next.handle(req)
      //ENTRADA --> DE LA PETICIÓN DE SALIDA QUIERO QUE ME RECUPERES LA ENTRADA (LA RESPUESTA!!!)
      //COMUNICACIÓN DEL BACK CON ANGULAR
      .pipe(finalize(() => {
        this.numPeticiones--;
        if (this.numPeticiones == 0)
          this.spinner.hide()

      }))
  }
}
