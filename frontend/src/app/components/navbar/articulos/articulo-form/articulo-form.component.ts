import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UsuarioLogin} from "../../../../entities/Login.model";
import {ToastService} from "../../../../services/toast.service";
import {FormUtils} from "../../../../utils/FormUtils";
import {ArticuloModel} from "../../../../entities/Articulo.model";
import {ArticuloService} from "../../../../services/articulo.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-articulo-form',
  templateUrl: './articulo-form.component.html',
  styleUrls: ['./articulo-form.component.css']
})
export class ArticuloFormComponent implements OnInit {
  formulario: FormGroup
  formUtils = new FormUtils()

  constructor(private formBuilder: FormBuilder,
              private toast: ToastService,
              private articuloService: ArticuloService,
              @Inject(MAT_DIALOG_DATA) public data: { articulo: ArticuloModel }) {
    console.log("Estoy en el dialogo");
    console.log(data.articulo);
    this.formulario = formBuilder.group({})
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nombre: new FormControl(this.data.articulo.nombre, [Validators.required]),
      descripcion: new FormControl(this.data.articulo.descripcion, [Validators.required]),
      stock: new FormControl(this.data.articulo.stock, [Validators.required, Validators.min(0), Validators.pattern("^[0-9]+$")]),
      observaciones: new FormControl(this.data.articulo.observaciones, []),
      referencia: new FormControl(this.data.articulo.referencia, [Validators.required]),
      precio: new FormControl(this.data.articulo.precio, [Validators.required, Validators.min(0), Validators.pattern("^[0-9]+.?[0-9]*$")]),
      categoria: new FormControl(this.data.articulo.categoria, [Validators.required]),
      peso: new FormControl(this.data.articulo.peso, [Validators.required, Validators.min(0), Validators.pattern("^[0-9]+.?[0-9]*$")]),
      consumible: new FormControl(this.data.articulo.consumible?this.data.articulo.consumible:false, [Validators.required]),
      foto: new FormControl(this.data.articulo.foto, [Validators.required])
    })
    this.formUtils.formulario = this.formulario
  }

  public enviarFormulario() {
    this.formulario.markAllAsTouched()

    if (this.formulario.invalid) {
      this.toast.warning('Revisa el formulario', 10000)
      return;
    }
    const articulo: ArticuloModel = {...this.formulario.value}
    console.log(articulo);
    //SI TIENE ID == ACTUALIZAR
    //SI NO TIENE ID == CREAR
    /*
    if (articulo.id)
      this.articuloService.update(articulo)
    else
      this.articuloService.save(articulo)
      */

  }

}
