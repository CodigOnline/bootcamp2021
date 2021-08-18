import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BaseUrlInterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(peticionSaliente: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    peticionSaliente = peticionSaliente.clone({
      url: `${environment.backend}/${peticionSaliente.url}`
    })

    console.log(peticionSaliente.url);

    return next.handle(peticionSaliente);
  }
}
