import {CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule, Provider} from '@angular/core';
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
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TokenInterceptorService} from "./interceptors/token-interceptor.service";
import {BaseUrlInterceptorService} from "./interceptors/base-url-interceptor.service";
import {ArticuloFormComponent} from './components/navbar/articulos/articulo-form/articulo-form.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {ShareArticuloComponent} from './components/navbar/articulos/share/share-articulo.component';
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatListModule} from "@angular/material/list";
import {MatLineModule} from "@angular/material/core";
import {MatTooltipModule} from "@angular/material/tooltip";
import {TruncatePipe} from './pipes/truncate.pipe';
import localeEs from '@angular/common/locales/es'
import {registerLocaleData} from "@angular/common";
import { CartComponent } from './components/navbar/cart/cart.component';
import { ArticuloDetallesComponent } from './components/shared/articulo-detalles/articulo-detalles.component';
import { UsuarioComponent } from './components/navbar/usuario/usuario.component';
import { SplitPipe } from './pipes/split.pipe';
registerLocaleData(localeEs, 'es')
@NgModule({
  declarations: [
    AppComponent,
    ArticulosComponent,
    OpinionesComponent,
    TestComponent,
    NavbarComponent,
    RegistroComponent,
    LoginComponent,
    ArticuloFormComponent,
    ShareArticuloComponent,
    TruncatePipe,
    CartComponent,
    ArticuloDetallesComponent,
    UsuarioComponent,
    SplitPipe
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
    MatButtonModule,
    MatBottomSheetModule,
    MatListModule,
    MatLineModule,
    MatTooltipModule
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
    }, {
      provide: LOCALE_ID, useValue: 'es'
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
