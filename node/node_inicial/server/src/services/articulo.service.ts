import {Articulo, ArticuloModel} from "../database/models/articulo.model";


export class ArticuloService {
    findAll(): Promise<ArticuloModel[]> {
        return Articulo.findAll()
    }

    findOneById(id: number): Promise<ArticuloModel | null> {
        return Articulo.findByPk(id)

    }

    update(id: number, nombre: string, descripcion: string, stock: number, observaciones: string, referencia: string, precio: number, categoria: string, peso: number, foto: string): Promise<[number, any]> {
        return Articulo.update({nombre, descripcion, stock, observaciones, referencia, precio, categoria, peso, foto}, {
            where: {id}
        })

    }

    save(nombre: string, descripcion: string, stock: number, observaciones: string, referencia: string, precio: number, categoria: string, peso: number, foto: string) {
        return Articulo.create({
            nombre, descripcion, stock, observaciones, referencia, precio, categoria, peso, foto
        })
    }

    remove(id: number): Promise<number> {
        return Articulo.destroy({where: {id}})

    }
}
