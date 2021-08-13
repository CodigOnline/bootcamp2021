import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {LoginService} from "../services/login.service";
import {ToastService} from "../services/toast.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorsInterceptorService implements HttpInterceptor {

  constructor(private loginService: LoginService, private toast: ToastService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(tap(
        () => {},
        error => { //ESTO SOLO SE LLAMA SI SE PRODUCE/RECIBE UN ERROR EN EL OBSERVABLE
          if (error instanceof HttpErrorResponse) { //COMPROBAR SI E ES DEL TIPO HTTPERRORRESPONSE
            //PARA COMPROBAR SI SON ERRORES DE HTTP
            switch (error.status) {
              case 400:
                this.toast.error("ERROR 400: Revisa la solicitud de los datos")
                break;
              case 401:
              case 403:
                if (this.loginService.getLogged()) {
                  this.loginService.cerrarSesion()
                }
                this.toast.error("ERROR 401/3 --> " + error.error.msg)

                //DESLOGUEAR EN CASO DE ESTAR LOGUEADO
                //MOSTRAR UN TOAST DE ERROR
                break;
              case 404:
                this.toast.error("EROR 404 --> No se ha encontrado el recurso solicitado");
                break;
              case 500:
                this.toast.error("ERROR 500 -->" + error.error.msg)
                break;
            }
          }
        }
      ))
  }
}
