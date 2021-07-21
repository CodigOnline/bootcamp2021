import express from 'express'
import UsuarioRouter from './routes/usuarios.routes';
import ArticulosRouter from './routes/articulos.routes';
import LoginRouter from './routes/login.routes';
import config from './settings/config';
import {mysql} from "./database/mysql";
import morgan from 'morgan'
import Log from "./settings/logger.winston";

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
        this.app.use(morgan('dev'));
        this.app.use(express.json()) //TRANSFORMAR EL BODY EN UN JSON
    }

    private routes() {
        this.app.use('/login', LoginRouter)
        this.app.use('/usuarios', UsuarioRouter)
        this.app.use('/articulos', ArticulosRouter)
    }

    private init() {
            Log.error('Mensaje de Log desde NPM')
            Log.warn('Mensaje de Log desde NPM') 
            Log.info('Mensaje de Log desde NPM')
            Log.http('Mensaje de Log desde NPM')
            Log.verbose('Mensaje de Log desde NPM')
            Log.debug('Mensaje de Log desde NPM')
            Log.silly('Mensaje de Log desde NPM')
        mysql.authenticate()
            .then(() => {
                Log.info("La base de datos está ONLINE")
                // CRAR ALS TABLAS TABLSA Y INICIAR EL SERVER
                /*Usuario.sync()
                    .then(() => {
                        console.log("Comprobación de Usuario correcta");
                    })
                    .catch((err: any) => {
                        console.log(`${err}`);
                        console.log("No se ha podido crear la tabla usuarios");
                    })
                Articulo.sync()//ELIMINA LA TABLA Y LUEGO LA CREA
                    .then(() => console.log('Tabla Articulos creada correctamente'))
                    .catch((err: any) => {
                        console.log(`${err}`);
                        console.log("No se ha podido crear la tabla articulos");
                    })*/
                this.app.listen(this.app.get('port'), () => {
                    Log.info(`Servidor iniciado en el puerto ${this.app.get('port')}`);
                })
            })
            .catch(() => {
                Log.error('Error en la connexión con la base de datos')
            })
    }

}

new App();
