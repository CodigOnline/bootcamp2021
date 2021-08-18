import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginService} from "../services/login.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private loginService: LoginService) {
  }

  intercept(peticionSaliente: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.loginService.getToken();
    if (token) { // if (token!==null)
      peticionSaliente = peticionSaliente.clone({
        headers: peticionSaliente.headers.set('Authorization', token)
      })
    }

    return next.handle(peticionSaliente)
  }
}
