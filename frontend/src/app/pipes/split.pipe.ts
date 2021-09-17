import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {

  transform(texto: string, romper: string, index: number = 0): unknown {
    return texto.split(romper)[index]
  }

}
