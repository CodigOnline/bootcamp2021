import {Pipe, PipeTransform} from '@angular/core';
import {Data} from "@angular/router";

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit = 150, completeWords = true, fin = '...'): DataTruncate {
    const data: DataTruncate = {
      value,
      isTruncate: false
    }
    if (completeWords && value.length > limit) {
      limit = value.substr(0, limit)
        .lastIndexOf(' ') + 1
      console.log(limit);
    }
    let texto = value;
    if (value.length > limit) {
      texto = value.substr(0, limit) + fin //NOS COGERÁ LAS 150 PRIMEROS CARACTERES Y LE AÑADIRÁ EL FIN (...)
      data.value = texto
      data.isTruncate = true
    }
    return data;
  }

  /**
   * VALUE --> VALOR ORIGINAL RECIBIDO
   * LIMIT --> CANTIDAD DE CARACTERES A MOSTRAR
   * COMPELTEWRODS --> ¿QUEREMOS QUE SE COMPLETEN LAS PALABRAS AL ROMPER EL TEXTO?
   * fin --> TEXTO A MOSTRAR CUANDO SE ROMPA EL TEXTO
   */
}

interface DataTruncate {
  value: string,
  isTruncate: boolean
}
