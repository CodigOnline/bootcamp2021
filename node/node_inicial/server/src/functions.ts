import {Usuario} from "./model";

export function mostrarUsuario(usuario: Usuario) {
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

    texto.replace(/[a-z]\s/ig, (letra: string) => {
        let letraMorse = morse.get(letra.toLowerCase())
        return letraMorse===undefined?'\t':`${letra}='${letraMorse}' `
    })

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

function eliminarTildes(letra: string): string {
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

}


let morse: Map<string | number, string> = new Map<string, string>()
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
