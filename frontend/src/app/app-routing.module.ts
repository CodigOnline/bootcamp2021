import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArticulosComponent} from "./components/navbar/articulos/articulos.component";
import {OpinionesComponent} from "./components/navbar/opiniones/opiniones.component";
import {TestComponent} from "./components/navbar/test/test.component";
import {RegistroComponent} from "./components/navbar/registro/registro.component";
import {LoginComponent} from "./components/navbar/login/login.component";
import {CartComponent} from "./components/navbar/cart/cart.component";
import {UsuarioComponent} from "./components/navbar/usuario/usuario.component";
import {AuthenticationGuard} from "./guard/authentication.guard";
import {NonAuthenticationGuard} from "./guard/non-authentication.guard";
import {AdminGuard} from "./guard/admin.guard";

const routes: Routes = [
  {path: '', redirectTo: 'articulos', pathMatch: 'full'},
  {path: 'articulos', component: ArticulosComponent},
  {path: 'articulos/formulario', component: TestComponent, canActivate: [AdminGuard]},
  {path: 'opiniones', component: OpinionesComponent},
  {path: 'registro', component: RegistroComponent, canActivate: [NonAuthenticationGuard]},
  {path: 'login', component: LoginComponent, canActivate: [NonAuthenticationGuard]},
  {path: 'cart', component: CartComponent, canActivate: [AuthenticationGuard]},
  {path: 'usuario', component: UsuarioComponent, canActivate: [AuthenticationGuard]},
  {path: 'test', component: TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
