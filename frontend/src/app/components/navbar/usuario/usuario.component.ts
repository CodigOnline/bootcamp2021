import {Component, OnInit} from '@angular/core';
import {CompraService} from "../../../services/compra.service";
import {first} from "rxjs/operators";
import {CompraModelResponse, ComprasModelResponse} from "../../../entities/Compra.model";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [CompraService]
})
export class UsuarioComponent implements OnInit {

  compras: CompraModelResponse[] = [];
  backend = environment.backendImg;

  constructor(private compraService: CompraService) {
  }

  ngOnInit(): void {
    this.compraService.findAll()
      .pipe(first())
      .subscribe((data: ComprasModelResponse) => {
        this.compras = data.compras;
        console.log(this.compras);
      })
  }

}
