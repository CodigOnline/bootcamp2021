import {Caja, Usuario} from "./model";

export default function asdfghsgffsaf(usuario: Usuario) {
    console.log("El nombre del usuario es: " + usuario.nombre + ", tiene una edad de: " + usuario.edad + ", y su dni es: " + usuario.dni);
    console.log(`El nombre del usuario es: ${usuario.nombre}, tiene una edad de: ${usuario.edad} y su dni es: ${usuario.dni}`);
}

export function contarLetras(texto: string) {
    let minus = texto.toLowerCase()
    //CLAVE VALOR
    const map: Map<string, number> = new Map<string, number>();
    /*for (let i = 0; i < minus.length; i++) {
        if (map.has(minus[i])) {
            const num = map.get(minus[i])
            if (num != undefined)
                map.set(minus[i], num + 1)
        } else {
            map.set(minus[i], 1)
        }


    }*/

    [...minus].forEach((letra: string) => {
        /*if (num==undefined){
            map.set(letra, 1)
        }
        else{
            map.set(letra, num+1)
        }*/
        //SI LA LETRA EN MINUS ES DIFERENTE QUE EN MAYUS
        if (letra.toUpperCase() === letra.toLowerCase()) {
            console.log(`letra: ${letra}`);
            return;
        }
        eliminarTildes(letra)
        const num = map.get(letra);
        map.set(letra, num === undefined ? 1 : (num + 1))
    })

    console.log(map);
}


export function toMorse(texto: string) {

    let text = texto.replace(/[a-z]/ig, function replace(letra: string) {
        let letraMorse = morse.get(letra.toLowerCase())
        console.log(letraMorse);
        return letraMorse === undefined ? '\t' : `${letra}='${letraMorse}' `
    })
    console.log(text);
    //return textoMorse

    /*
        [...texto].forEach((letra: string) => {
            letra = eliminarTildes(letra);
            let letraMorse = morse.get(letra.toLowerCase())
            process.stdout.write(letraMorse===undefined?'\t':`${letra}='${letraMorse}' `);
        })
        console.log();
    */

    /*    for (let i=0;i<texto.length;i++){
            let letra = texto[i];
            letra = eliminarTildes(letra);
            let letraMorse = morse.get(letra.toLowerCase())
            process.stdout.write(letraMorse===undefined?'\t':`${letraMorse} `);
        }*/
}

export function eliminarTildes(texto: string): string {
    [...texto].filter((text: string) => text.split(" ").length > 2)
    let textoSinTildes = texto.replace(/[A-Za-zÁÉÍÓÚáéíóúñÑ ]/ig, (letra: string) => {
        switch (letra) {
            case 'à':
            case 'á':
            case 'ä':
                return 'a'
            case 'é':
            case 'è':
            case 'ë':
                return 'e'
            case 'í':
            case 'ì':
            case 'ï':
                return 'i'
            case 'ó':
            case 'ò':
            case 'ö':
                return 'o'
            case 'ú':
            case 'ù':
            case 'ü':
                return 'u'
            default:
                return letra;
        }
    })
    console.log(textoSinTildes);
    return textoSinTildes
}


let morse: Map<string, string> = new Map<string, string>()
morse.set('a', '.-');
morse.set('b', '-...');
morse.set('c', '-.-.');
morse.set('d', '-..');
morse.set('e', '.');
morse.set('f', '..-.');
morse.set('g', '--.');
morse.set('h', '....')
morse.set('i', '..')
morse.set('j', '.---')
morse.set('k', '-.-')
morse.set('l', '.-..')
morse.set('m', '--')
morse.set('n', '-.')
morse.set('o', '---')
morse.set('p', '.--.')
morse.set('q', '--.-')
morse.set('r', '.-.')
morse.set('s', '...')
morse.set('t', '-')
morse.set('u', '..-')
morse.set('v', '...-')
morse.set('w', '.--')
morse.set('x', '-..-')
morse.set('y', '-.--')
morse.set('z', '--..')


export function ordenarCajas(cajas: Caja[], inicio: Date) {
    let ordenada: Caja[] = [cajas[0]]
    let [, ...rest] = cajas
    rest.forEach((caja: Caja) => {
        ordenar(ordenada, [...ordenada], caja)

    })
    //console.log(ordenada);
    cajas = cajas.filter(caja => !ordenada.includes(caja))
    cajas = cajas.sort((a, b) => a.altura - b.altura)
    // console.log(ordenada);
    console.log(ordenada);
    if (cajas.length > 0)
        ordenarCajas(cajas, inicio);

}

function ordenar(ordenada: Caja[], cajas: Caja[], caja: Caja) {
    if (cajas.length === 0) {
        ordenada.splice(0, 0, caja)
        return
    }
    let last: Caja = cajas[cajas.length - 1]
    if (caja.altura === last.altura)
        return;
    if (caja.altura > last.altura) {
        let idx = ordenada.length - (ordenada.length - cajas.length);
        ordenada.splice(idx, 0, caja)
        return;
    }
    cajas.pop();
    ordenar(ordenada, cajas, caja)
}


/*Algoritmo iterativo*/
export function ordenarCajasIterativo(cajas: Caja[], inicio: Date) {
    while (cajas.length > 0) {
        let ordenada = ordenarIterativo(cajas);
        //console.log(ordenada);
        cajas = cajas.filter(caja => !ordenada.includes(caja))
    }
    let fin = new Date();
    let tiempo = fin.getTime() - inicio.getTime();
    console.log(tiempo);


}

function ordenarIterativo(cajas: Caja[]): Caja[] {
    let ordenadas: Caja[] = [cajas[0]]
    let [, ...rest] = cajas
    rest.forEach((caja: Caja) => {
        if (caja.altura > ordenadas[ordenadas.length - 1].altura) {
            ordenadas.push(caja)
            return;
        }
        let encontrada = false;
        ordenadas.forEach((cajaOrdenada: Caja, idx: number) => {
            if (encontrada)
                return;
            if (caja.altura === cajaOrdenada.altura) {
                encontrada = true;
                return;
            }
            if (caja.altura < cajaOrdenada.altura) {
                ordenadas.splice(idx, 0, caja)
                encontrada = true;
                return;
            }
        })
    })
    return ordenadas;


}

export function ordenarRapido(cajas: Caja[]) {
    let ordenadas: Caja[] = []
    cajas.sort((a: Caja, b: Caja) => {
        if (a.altura < b.altura) return -1
        if (a.altura > b.altura) return 1
        return 0
    })
    while (cajas.length > 0) {
        ordenadas.push(cajas[0])
        cajas.slice(0, 1);
        cajas.forEach((caja: Caja) => {
            let last = ordenadas[ordenadas.length - 1]
            if (caja.altura != last.altura) {
                ordenadas.push(caja)
            }
        })
        cajas = cajas.filter((caja: Caja) => !ordenadas.includes(caja))
        console.log(ordenadas);
        ordenadas = [];
    }
}

export function ordenarCajasDalios(cajas: Caja[]): string {

    let info: string = "";

    if (cajas.length < 1) info = "No hay cajas para colocar.";

    else {

        let camiones: Caja[][] = [[]];

        cajas.forEach(caja => {

            let pasarDeCamion = true; // Determina si la caja va a otro camion

            for (let i = 0; i < camiones.length && pasarDeCamion; i++) {

                let filtro = camiones[i].find((c: Caja) => c.altura === caja.altura)
                //let filtro = camiones[i].filter(c => c.altura == caja.altura); // recuperar en el filtro las cajas con la misma altura que la caja que se está recorriendo
                if (!filtro) { // Si no hay registros en el filtro (No hay ninguna caja con la misma altura de la que queremos meter)
                    camiones[i].push(caja);
                    pasarDeCamion = false;
                }

            }

            if (pasarDeCamion) camiones.push([caja]); // Si ha que pasar de camion, se añade un nuevo camion al array y que adenas contega la caja
        });

        // Ordenar camiones
        camiones.forEach(camion => camion.sort((a, b) => a.altura - b.altura));

        // Prepara mensaje de salida
        for (let i = 0; i < camiones.length; i++) {

            info += `Camión nº${i}: ${JSON.stringify(camiones[i])}\n`;
        }
        ;
    }
    ;

    return info;

}
