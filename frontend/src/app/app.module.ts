import {CUSTOM_ELEMENTS_SCHEMA, NgModule, Provider} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ArticulosComponent} from './components/navbar/articulos/articulos.component';
import {OpinionesComponent} from './components/navbar/opiniones/opiniones.component';
import {RouterModule} from "@angular/router";
import {TestComponent} from './components/navbar/test/test.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {RegistroComponent} from './components/navbar/registro/registro.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './components/navbar/login/login.component';
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {NgxSpinnerModule} from "ngx-spinner";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LoadingInterceptorService} from "./interceptors/loading.interceptor.service";
import {ErrorsInterceptorService} from "./interceptors/errors.interceptor.service";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {TokenInterceptorService} from "./interceptors/token-interceptor.service";
import {BaseUrlInterceptorService} from "./interceptors/base-url-interceptor.service";
import { ArticuloFormComponent } from './components/navbar/articulos/articulo-form/articulo-form.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    ArticulosComponent,
    OpinionesComponent,
    TestComponent,
    NavbarComponent,
    RegistroComponent,
    LoginComponent,
    ArticuloFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    NgxSpinnerModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatDialogModule,
    MatButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptorService,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorsInterceptorService,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
