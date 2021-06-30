import express from 'express'
import UsuarioRouter from './routes/usuarios.routes'
import config from './settings/config';
import {mysql} from "./database/mysql";
import {Usuario} from "./database/models/usuario.model";

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
        this.app.use('/usuarios', UsuarioRouter)
    }

    private init() {
        mysql.authenticate()
            .then(() => {
                console.log("BD CONECTADA");
                // CRAR ALS TABLAS TABLSA Y INICIAR EL SERVER
                Usuario.sync({force: true})
                    .then(()=>{console.log("Tabla Usuario creada correctamente");})
                    .catch((err:any)=>{
                        console.log(`${err}`);
                        console.log("No se ha podido crear la tabla usuarios");})
                this.app.listen(this.app.get('port'), function init() {
                    console.log("Servidor inicado en el puerto " + config.app.port);
                })
            })
            .catch(() => {
                console.log("No tenemos acceso a la BD");
            })
    }

}

new App();
