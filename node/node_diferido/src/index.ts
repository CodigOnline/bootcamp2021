interface Comida {
    comensales: number;
    descripcion: string;
    nombre: string;
}


let comidas: Comida[] = [];
let comida: Comida = {
    comensales: 1,
    descripcion: 'Pasta con tomate y carne',
    nombre: 'Boloñesa'
}
comidas.push({comensales: 1, descripcion: 'Pasta con tomate y carne', nombre: 'Boloñesa'})
comidas.push({comensales: 2, descripcion: 'Pasta con tomate y queso', nombre: 'asd'})
comidas.push({comensales: 3, descripcion: 'Pasta con tomate y verderuas', nombre: 'dsada'})
comidas.push({comensales: 4, descripcion: 'Pasta con tomate y nata', nombre: 'sdsdsds'})

let [bolonyesa,parmesana] = comidas;

console.log(`Boloñesa: ${JSON.stringify(bolonyesa)}`);
console.log(`Parmesana: ${JSON.stringify(parmesana)}`);




