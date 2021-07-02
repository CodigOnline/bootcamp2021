import * as Sequelize from "sequelize";
import {mysql} from "../mysql";

export interface ArticuloModel extends Sequelize.Model{
    //TODOS LOS ATRIBUTOS QUE DESEAMOS PARA LA TABLA
}

export interface NewArticuloModel{
    //TODOS LOS ATRIBUTOS NECESARIOS PARA CREAR LA FILA
}

export const Articulo = mysql.define<ArticuloModel,NewArticuloModel>('articulos',{

})
