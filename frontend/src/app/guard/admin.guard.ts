import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginService} from "../services/login.service";
import {ToastService} from "../services/toast.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router, private toast: ToastService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const admin = this.loginService.isAdmin();
    if (admin) {
      return true;
    } else {
      this.toast.warning("¡No intentes acceder donde no puedes!")
      this.router.navigate(['/articulos'])
      return false;
    }
  }

}
