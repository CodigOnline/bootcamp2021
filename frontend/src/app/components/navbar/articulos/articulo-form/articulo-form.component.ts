import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UsuarioLogin} from "../../../../entities/Login.model";
import {ToastService} from "../../../../services/toast.service";
import {FormUtils} from "../../../../utils/FormUtils";

@Component({
  selector: 'app-articulo-form',
  templateUrl: './articulo-form.component.html',
  styleUrls: ['./articulo-form.component.css']
})
export class ArticuloFormComponent implements OnInit {
  formulario: FormGroup
  formUtils = new FormUtils()

  constructor(private formBuilder: FormBuilder, private toast: ToastService) {
    this.formulario = formBuilder.group({})
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nombre: new FormControl('',[Validators.required]),
      descripcion: new FormControl('',[Validators.required]),
      stock: new FormControl(0,[Validators.required,Validators.min(0),Validators.pattern("^[0-9]+$")]),
      observaciones: new FormControl('',[]),
      referencia: new FormControl('',[Validators.required]),
      precio: new FormControl(0,[Validators.required,Validators.min(0),Validators.pattern("^[0-9]+.?[0-9]*$")]),
      categoria: new FormControl('',[Validators.required]),
      peso: new FormControl(0,[Validators.required,Validators.min(0),Validators.pattern("^[0-9]+.?[0-9]*$")]),
      consumible: new FormControl(false,[Validators.required]),
      foto: new FormControl('',[Validators.required]),
    })
    this.formUtils.formulario = this.formulario
  }

  public enviarFormulario() {
    this.formulario.markAllAsTouched()

    if (this.formulario.invalid) {
      this.toast.warning('Revisa el formulario', 10000)
      return;
    }
  }

}
