import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArticulosComponent} from "./components/navbar/articulos/articulos.component";
import {OpinionesComponent} from "./components/navbar/opiniones/opiniones.component";

const routes: Routes = [
  {path: '', redirectTo: 'articulos', pathMatch: 'full'},
  {path: 'articulos', component: ArticulosComponent},
  {path: 'opiniones', component: OpinionesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
