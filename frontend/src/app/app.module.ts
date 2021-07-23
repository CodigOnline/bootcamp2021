import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticulosComponent } from './components/navbar/articulos/articulos.component';
import { OpinionesComponent } from './components/navbar/opiniones/opiniones.component';
import {RouterModule} from "@angular/router";
import { TestComponent } from './components/navbar/test/test.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticulosComponent,
    OpinionesComponent,
    TestComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
