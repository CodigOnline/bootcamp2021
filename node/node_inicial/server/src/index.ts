import {Usuario} from "./model";
import {mostrarUsuario} from "./functions";

let usuarios: Usuario[] = []
usuarios.push({nombre: "Alvaro", edad: 13})
usuarios.push({nombre: "Alvaro1", edad: 13})
usuarios.push({nombre: "Alvaro2", edad: 13})
usuarios.push({nombre: "Alvaro3", edad: 13})
usuarios.push({nombre: "Alvaro4", edad: 13})
usuarios.push({nombre: "Alvaro5", edad: 13})
usuarios[123] = {nombre: "Juan", edad: 47};


mostrarUsuario(usuarios[0]);


function test1(texto: string) {
    let nombre:string[];
    [...nombre] = texto;
    console.log(nombre);
}

test1("Alvaro")


export {}

//mostrarUsuario({nombre: "Alvaro", edad: 13, dni: "3456789H"})


