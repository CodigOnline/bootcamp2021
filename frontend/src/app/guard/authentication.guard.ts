import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginService} from "../services/login.service";
import {ToastService} from "../services/toast.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router, private toast:ToastService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const logged = this.loginService.getLogged();
    if (logged) {
      return true;
    } else {
      this.toast.warning("Debes loguearte para acceder a esta ruta")
      this.router.navigate(['/articulos'])
      return false;
    }
  }

}
