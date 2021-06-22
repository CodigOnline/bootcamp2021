function calcularRecursivo(num: number): number {
    if (num === 1) {
        return 1
    } else {
        let resultado = calcularRecursivo(num-1) * num;
        console.log(`${num}*${num-1}=${resultado}`);
        return resultado
    }
}

let resultado = calcularRecursivo(15);
console.log(resultado);


/*
calcularRecursivo(15)<-- console.log(1)
calcularRecursivo(14)<-- console.log(1)
calcularRecursivo(13)<-- console.log(1)
calcularRecursivo(12)<-- console.log(1)
calcularRecursivo(11)<-- console.log(1)
calcularRecursivo(10)<-- console.log(1)
calcularRecursivo(9)<-- console.log(1)
calcularRecursivo(8)<-- console.log(1)
calcularRecursivo(7)<-- console.log(1)
calcularRecursivo(6)<-- console.log(1)
calcularRecursivo(5)<-- console.log(1)
calcularRecursivo(4)<-- console.log(1)
calcularRecursivo(3)<-- console.log(1)
calcularRecursivo(2) <-- console.log(2)+1
calcularRecursivo(1) 1+1
calcularRecursivo(0) return 1
 */
