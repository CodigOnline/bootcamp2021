import {EnumOpinionEstado, Opinion, OpinionModel} from "../database/models/opinion.model";
import {Usuario} from "../database/models/usuario.model";

export class OpinionesService {
    findAll(role: number): Promise<OpinionModel[]> | null {
        switch (role) {
            case 0:
                console.log("Buscando todas las opiniones");
                return Opinion.findAll({
                    include: {model: Usuario, attributes: ['nombre'], as: 'usuario'},
                    attributes: ['id', 'estado', 'descripcion']
                })
            case 1:
                console.log("Buscando todas las opiniones ACEPTADAS");
                return Opinion.findAll({
                    where: {
                        estado: EnumOpinionEstado.ACEPTADA
                    },
                    include: {model: Usuario, attributes: ['nombre'], as: 'usuario'},
                    attributes: ['id', 'descripcion']
                })
        }
        return null
    }

    save(idUsuario: number, descripcion: string) {
        return Opinion.create({idUsuario, descripcion})
    }

    update(id: number, idUsuario: number, descripcion: string) {
        return Opinion.update({descripcion, estado: EnumOpinionEstado.PENDIENTE}, {where: {id, idUsuario}})
    }

    delete(idUsuario: number) {
        return Opinion.destroy({where: {idUsuario}})
    }

    aceptarOpinion(idOpinion: number) {
        return Opinion.update({estado: EnumOpinionEstado.ACEPTADA}, {where: {id: idOpinion}})

    }

    denegarOpinion(idOpinion: number) {
        return Opinion.update({estado: EnumOpinionEstado.DENEGADA}, {where: {id: idOpinion}})
    }
}
