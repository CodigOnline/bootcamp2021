import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticulosComponent } from './components/navbar/articulos/articulos.component';
import { OpinionesComponent } from './components/navbar/opiniones/opiniones.component';
import {RouterModule} from "@angular/router";
import { TestComponent } from './components/navbar/test/test.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistroComponent } from './components/navbar/registro/registro.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './components/navbar/login/login.component';
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";

@NgModule({
  declarations: [
    AppComponent,
    ArticulosComponent,
    OpinionesComponent,
    TestComponent,
    NavbarComponent,
    RegistroComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
