import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UsuarioLogin} from "../../../../entities/Login.model";
import {ToastService} from "../../../../services/toast.service";
import {FormUtils} from "../../../../utils/FormUtils";
import {ArticuloModel} from "../../../../entities/Articulo.model";
import {ArticuloService} from "../../../../services/articulo.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-articulo-form',
  templateUrl: './articulo-form.component.html',
  styleUrls: ['./articulo-form.component.css']
})
export class ArticuloFormComponent implements OnInit {
  formulario: FormGroup
  formUtils = new FormUtils()
  articulo: ArticuloModel = {} as ArticuloModel
  foto: any = null;
  extensionesAdmitidas = ["jpg", "jpeg", "png", "gif"]

  constructor(private formBuilder: FormBuilder,
              private toast: ToastService,
              private articuloService: ArticuloService,
              public dialogRef: MatDialogRef<ArticuloFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { articulo: ArticuloModel }) {
    this.articulo = data.articulo
    this.formulario = formBuilder.group({})
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id: new FormControl(this.articulo.id), //NOS PONDRÁ EL ID Y SI NO EXISTE PONDRÁ NULL
      nombre: new FormControl(this.articulo.nombre, [Validators.required]),
      descripcion: new FormControl(this.articulo.descripcion, [Validators.required]),
      stock: new FormControl(this.articulo.stock, [Validators.required, Validators.min(0), Validators.pattern("^[0-9]+$")]),
      observaciones: new FormControl(this.articulo.observaciones, []),
      referencia: new FormControl(this.articulo.referencia, [Validators.required]),
      precio: new FormControl(this.articulo.precio, [Validators.required, Validators.min(0), Validators.pattern("^[0-9]+.?[0-9]*$")]),
      categoria: new FormControl(this.articulo.categoria, [Validators.required]),
      peso: new FormControl(this.articulo.peso, [Validators.required, Validators.min(0), Validators.pattern("^[0-9]+.?[0-9]*$")]),
      consumible: new FormControl(this.articulo.consumible ? this.articulo.consumible : false, [Validators.required]),
      foto: new FormControl(this.articulo.foto, [Validators.required])
    })
    this.formUtils.formulario = this.formulario
  }

  public enviarFormulario() {
    this.formulario.markAllAsTouched()

    if (this.formulario.invalid) {
      this.toast.warning('Revisa el formulario', 10000)
      return;
    }
    this.articulo = {...this.formulario.value}
    console.log(this.articulo);
    //SI TIENE ID == ACTUALIZAR
    //SI NO TIENE ID == CREAR
    if (this.foto !== null) {
      this.articuloService.setFoto(this.foto)
    }
    if (this.articulo.id) //SI TIENE ID QUIERE DECIR QUE EL ARTICULO EXISTE EN LA BD Y SOLO HAY QUE ACTUALIZARLO
      this.articuloService.update(this.articulo, this.dialogRef)
    else
      this.articuloService.save(this.articulo, this.dialogRef)

  }

  ficheroSeleccionado(event: any) {
    this.foto = event.target.files[0];
    const extension: string = this.foto.type.split("/")[1]
    if (this.extensionesAdmitidas.includes(extension)) {
      this.formUtils.get('foto').setValue(this.foto.name)
    } else {
      this.foto = null;
      this.toast.warning(`Extension ${extension} NO admitida, sube otra foto`);
    }
  }

}
