import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {LoginService} from "../../../services/login.service";
import {UsuarioLogin} from "../../../entities/Login.model";
import {ToastService} from "../../../services/toast.service";
import {FormUtils} from "../../../utils/FormUtils";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup
  formUtils = new FormUtils()

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private toast: ToastService) {
    this.formulario = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
        email: new FormControl('',
          [Validators.required, Validators.pattern('^[a-z0-9._+-]+@[a-z0-9.]+[.][a-z]{2,4}$')]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      }
    )
    this.formUtils.formulario = this.formulario
  }

  public enviarFormulario() {
    this.formulario.markAllAsTouched()

    if (this.formulario.invalid) {
      this.toast.warning('Revisa el formulario', 10000)
      return;
    }
    const usuario: UsuarioLogin = {
      email: this.formUtils.get("email").value,
      password: this.formUtils.get("password").value
    }
    this.loginService.login(usuario)
  }

}
