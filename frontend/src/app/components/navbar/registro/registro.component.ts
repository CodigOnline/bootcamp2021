import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {RegistroService} from "../../../services/registro.service";
import {Registro} from "../../../entities/Registro.model";
import Swal from "sweetalert2";
import {ToastService} from "../../../services/toast.service";

import {faUser} from "@fortawesome/free-regular-svg-icons";
import {faAt} from "@fortawesome/free-solid-svg-icons";
import {faKey} from "@fortawesome/free-solid-svg-icons";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {FormUtils} from "../../../utils/FormUtils";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [RegistroService] /*CICLO DE VIDA LIGADO AL COMPONENTE, CUANDO SE DESTRUYE EL COMPONENTE SE DESTRUYE EL SERVICIO*/
})
export class RegistroComponent implements OnInit {
  faUser = faUser
  faAt = faAt
  faKey = faKey
  faUserCircle = faUserCircle
  formulario: FormGroup
  formUtils = new FormUtils()

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


  constructor(private formBuilder: FormBuilder, private registroService: RegistroService, private toast: ToastService) {
    this.formulario = this.formBuilder.group({});
  }

  ngOnInit(): void {
    console.log("Iniciando componente registro");
    this.formulario = this.formBuilder.group({
        nombre: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern('^[a-zA-Z ]+$')]),
        username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-Z0-9 ]+$')]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._+-]+@[a-z0-9.]+[.][a-z]{2,4}$')]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      }, {validator: this.matchPassword} as AbstractControlOptions
    )
    this.formUtils.formulario = this.formulario
  }

  private matchPassword(control: AbstractControl) {
    const password = control.get('password')!.value
    const confirmPassword = control.get('confirmPassword')!.value
    if (password !== confirmPassword) {
      control.get('confirmPassword')!
        .setErrors({matchPassword: true})
    }
  }

  public enviarFormulario() {
    this.formulario.markAllAsTouched()

    if (this.formulario.invalid) {
      console.log(this.formulario.errors);
      this.toast.warning("Revisa el formulario", 10000)

      /* Swal.fire({
         title: 'Custom animation with Animate.css',
         showClass: {
           popup: 'animate__animated animate__fadeInDown'
         },
         hideClass: {
           popup: 'animate__animated animate__fadeOutUp'
         }
       })*/
      return;
    }

    const nombre = this.formulario.get('nombre')!.value
    const username = this.formulario.get('username')!.value
    const password = this.formulario.get('password')!.value
    const email = this.formulario.get('email')!.value

    const registro: Registro = {
      nombre, username, password, email
    }
    console.log(registro);

    /*const observable = this.httpClient.post('http://localhost:3000/usuarios', registro)
    const subscription = observable.subscribe(data=>{console.log(data); }) //SUBSCRIBIR A SUS NOTIFICACIONES

    // ....

    subscription.unsubscribe()
    */


    /*this.httpClient.post('http://localhost:3000/usuarios', registro).subscribe(data => {
      console.log(data);

    })
*/

    //SOLO NOS FALTA ENVIARLO AL BACKEND
    this.registroService.registrar(registro)


  }
}

