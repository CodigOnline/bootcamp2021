import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CartModel} from "../entities/Cart.model";
import {CompraModel, CompraModelResponse, ComprasModelResponse} from "../entities/Compra.model";
import {ArticuloModel} from "../entities/Articulo.model";
import {CompraArticuloModel} from "../entities/CompraArticuloModel";
import {LoginService} from "./login.service";
import {first} from "rxjs/operators";
import {ToastService} from "./toast.service";
import {Router} from "@angular/router";
import {ArticuloService} from "./articulo.service";

@Injectable()
export class CompraService {

  constructor(private http: HttpClient, private loginService: LoginService, private toastService: ToastService, private router: Router, private articuloService: ArticuloService) {
  }

  comprar(cart: CartModel) {
    const compra: CompraModel = {
      importe: cart.totalPrecio,
      gastosEnvio: cart.envio,
      formaDePago: 3,
      articulos: Array.from(cart.articulos.entries())
        .map((item: [ArticuloModel, number]) => { //LA POS 0 es el ARTICULOMODEL y LA PAS 1 es la CANTIDAD
          const compraArticulo: CompraArticuloModel = {
            id: item[0].id!,
            cantidad: item[1]
          }
          return compraArticulo;
        })
    }
    this.http.post(`compras/${this.loginService.getUsuario()!.id}`, compra)
      .pipe(first())
      .subscribe((data: any) => {
        this.toastService.success(data.msg)
        compra.articulos.forEach(articulo => {
          this.articuloService.restarStock(articulo.id, articulo.cantidad)
        })
        this.router.navigate([''])
      })

  }

  findAll() {
    const usuarioId = this.loginService.getUsuario()?.id!
    return this.http.get<ComprasModelResponse>(`compras/${usuarioId}`)

  }
}
