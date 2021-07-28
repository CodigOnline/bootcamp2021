import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formulario: FormGroup

  // FormBuilder
  /**SINGLETON
   * SOLO TENDREMOS UNA CREACIÓN DE LA CLASE EN TODA NUESTRA APP
   * ¡ÚNICAMENTE TENDREMOS UN OBJETO CREADO!
   *
   * LOGIN SERVICE -->
   *      variable con la comprobación de si el usuario está logueado o no está logueado
   *      variable con el token de auth para el server
   *      variable de si el usuario es admin o no
   *
   *
   *      private LoginService(){ CONSTRUCTOR PRIVADO NADIE FUERA DE LA CLASE PUEDE ACCEDER A ESTA FUNCIÓN
   *        isLoggged = false;
   *        token = null;
   *        isAdmin=false;
   *      }
   *
   *      static loginService=null;
   *      public static constructor(){
   *          FUNCIÓN ESTTICA --> AQUELLA QUE SE PUEDE INVOCAR SIN TENER UN OBJETO DE LA CLASE
   *          LoginService.constructor()
   *        if (loginService == null){
   *          loginService = new LoginService(); //esto solo se ejecuta una vez
   *        }
   *        return loginService;
   *      }
   *
   *
   * **/


  constructor(private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nombre: new FormControl('', [Validators.required, Validators.minLength(10)]),
      username: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl()
    })
  }

  public enviarFormulario() {

    if (this.formulario.get('nombre')?.invalid) {
      console.log("El nombre completo introducido es invalido");
    }
    if (this.formulario.invalid) {
      console.log("El formulario tiene campos invalidos");
      return;
    }

    console.log("Enviando el formulario");

  }

}
