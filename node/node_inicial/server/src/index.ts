import express from 'express'
import UsuarioRouter from './routes/usuarios.routes';
import ArticulosRouter from './routes/articulos.routes';
import LoginRouter from './routes/login.routes';
import config from './settings/config';
import {mysql} from "./database/mysql";

/*import {Usuario} from "./database/models/usuario.model";
import {Articulo} from "./database/models/articulo.model";*/

class App {
    private app: express.Application;

    constructor() {
        this.app = express()

        this.settings();

        this.middlewares();
        this.routes();
        this.init();

    }

    private settings() {
        this.app.set('port', config.app.port) //3000 --> add una propiedad a express
    }

    private middlewares() {
        this.app.use(express.json()) //TRANSFORMAR EL BODY EN UN JSON
    }

    private routes() {
        this.app.use('/login', LoginRouter)
        this.app.use('/usuarios', UsuarioRouter)
        this.app.use('/articulos', ArticulosRouter)
    }

    private init() {
        mysql.authenticate()
            .then(() => {
                console.log("BD CONECTADA");
                // CRAR ALS TABLAS TABLSA Y INICIAR EL SERVER
                /*Usuario.sync({alter: true})
                    .then(() => {
                        console.log("Tabla Usuario creada correctamente");
                    })
                    .catch((err: any) => {
                        console.log(`${err}`);
                        console.log("No se ha podido crear la tabla usuarios");
                    })
                Articulo.sync({alter: true})//ELIMINA LA TABLA Y LUEGO LA CREA
                    .then(() => console.log('Tabla Articulos creada correctamente'))
                    .catch((err: any) => {
                        console.log(`${err}`);
                        console.log("No se ha podido crear la tabla articulos");
                    })
                /*                Articulo.sync() //INTENTA CREAR LA TABLA SI NO EXISTE, SI EXISTE NO HACE NADA
                                Articulo.sync({alter:true}) //ELIMINA LA TABLA Y LUEGO LA CREA*/
                this.app.listen(this.app.get('port'), () => {
                    console.log(`Servidor iniciado en el puerto ${this.app.get('port')}`);
                })
            })
            .catch(() => {
                console.log("No tenemos acceso a la BD");
            })
    }

}

new App();
