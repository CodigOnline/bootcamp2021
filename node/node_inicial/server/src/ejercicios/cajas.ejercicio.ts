import {Caja} from "./model";
import {ordenarCajas, ordenarCajasDalios} from "./functions";

let cajas: Caja[] = []
for (let i = 0; i < 10; i++) {
    cajas.push({contenido: `Num${i}`, altura: Math.floor(Math.random() * 20) + 1})
}

console.log(cajas);
let inicio = new Date();
console.log("Alvaro");
ordenarCajas(cajas, inicio);
console.log("Dalios");
console.log(ordenarCajasDalios(cajas));
