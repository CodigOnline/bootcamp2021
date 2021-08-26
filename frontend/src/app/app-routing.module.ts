import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArticulosComponent} from "./components/navbar/articulos/articulos.component";
import {OpinionesComponent} from "./components/navbar/opiniones/opiniones.component";
import {TestComponent} from "./components/navbar/test/test.component";
import {RegistroComponent} from "./components/navbar/registro/registro.component";
import {LoginComponent} from "./components/navbar/login/login.component";
import {ArticuloFormComponent} from "./components/navbar/articulos/articulo-form/articulo-form.component";

const routes: Routes = [
  {path: '', redirectTo: 'articulos', pathMatch: 'full'},
  {path: 'articulos', component: ArticulosComponent},
  {path: 'articulos/formulario', component: ArticuloFormComponent},
  {path: 'opiniones', component: OpinionesComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'login', component: LoginComponent},
  {path: 'test', component: TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
