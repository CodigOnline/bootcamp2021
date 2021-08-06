import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../../../services/login.service";
import {UsuarioLogin} from "../../../entities/Login.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) {
    this.formulario = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._+-]+@[a-z0-9.]+[.][a-z]{2,4}$')]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      }
    )
  }

  public enviarFormulario() {
    this.formulario.markAllAsTouched()

    if (this.formulario.invalid) {
      alert('Upps!! El formulario contiene errores')
    }

    const usuario: UsuarioLogin = {
      email: this.form("email").value,
      password: this.form("password").value
    }
    this.loginService.login(usuario)
  }

  public form(campo: string): AbstractControl {
    return this.formulario.get(campo)!
  }

  private fieldRequiredLength(campo: string): number {
    return this.formulario.get(campo)!.errors!.minlength.requiredLength
  }

  private fieldActualLength(campo: string): number {
    return this.formulario.get(campo)!.errors!.minlength.actualLength
  }

  public fieldLength(campo: string): string {
    return `La longitud del ${campo} debe ser de ${this.fieldRequiredLength(campo)} caracteres.
    ${this.fieldRequiredLength(campo) - this.fieldActualLength(campo)} restantes`
  }

}
