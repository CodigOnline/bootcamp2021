import {AbstractControl, FormGroup} from "@angular/forms";

export class FormUtils{

  set formulario(value: FormGroup) {
    this._formulario = value;
  }


  private _formulario:FormGroup = new FormGroup({})

  public get(campo: string): AbstractControl {
    return this._formulario.get(campo)!
  }

  private fieldRequiredLength(campo: string): number {
    return this._formulario.get(campo)!.errors!.minlength.requiredLength
  }

  private fieldActualLength(campo: string): number {
    return this._formulario.get(campo)!.errors!.minlength.actualLength
  }

  public fieldLength(campo: string): string {
    return `La longitud del ${campo} debe ser de ${this.fieldRequiredLength(campo)} caracteres.
    ${this.fieldRequiredLength(campo) - this.fieldActualLength(campo)} restantes`
  }

}
