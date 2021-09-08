import express from 'express'
import UsuarioRouter from './routes/usuarios.routes';
import ArticulosRouter from './routes/articulos.routes';
import LoginRouter from './routes/login.routes';
import OpinionesRouter from './routes/opiniones.routes';
import ComprasRouter from './routes/compras.routes';
import config from './settings/config';
import {mysql} from "./database/mysql";
import morgan from 'morgan'
import Log from "./settings/logger.winston";
import {Usuario} from "./database/models/usuario.model";
import {Articulo} from "./database/models/articulo.model";
import {Opinion} from "./database/models/opinion.model";
import {Compra} from "./database/models/compra.model";
import {CompraArticulos} from "./database/models/compra_articulos.model";
//import path from "path";

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
        this.app.use('/img/articulos', express.static("./public/articulos/imagenes/"));
        //this.app.use('/img/articulos',express.static(path.join(__dirname,"../public/articulos/imagenes/")));
        this.app.use((_: express.Request, response: express.Response, next: express.NextFunction) => {
            response.header('Access-Control-Allow-Origin', 'http://localhost:4200')
            response.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
            response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            next();
        })
    }

    private routes() {
        this.app.use('/login', LoginRouter)
        this.app.use('/usuarios', UsuarioRouter)
        this.app.use('/articulos', ArticulosRouter)
        this.app.use('/opiniones', OpinionesRouter)
        this.app.use('/compras', ComprasRouter)
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

                Usuario.sync()
                    .then(() => {
                        console.log("Tabla Usuario creada correctamente");
                    })
                    .catch((err: any) => {
                        console.log(`${err}`);
                        console.log("No se ha podido crear la tabla usuarios");
                    })
                Opinion.sync()//ELIMINA LA TABLA Y LUEGO LA CREA
                    .then(() => console.log('Tabla Opiniones creada correctamente'))
                    .catch((err: any) => {
                        console.log(`${err}`);
                        console.log("No se ha podido crear la tabla opiniones");
                    })
                Compra.sync({alter: true})
                    .then(() => {
                        console.log('Tabla Compra creada correctamente')
                        Articulo.sync({alter: true})//ELIMINA LA TABLA Y LUEGO LA CREA
                            .then(() => {
                                console.log('Tabla Articulos creada correctamente')
                                CompraArticulos.sync({alter: true})
                                    .then(() => console.log('Tabla CompraArticulos creada correctamente'))
                                    .catch((err: any) => {
                                        console.log(`${err}`);
                                        console.log("No se ha podido crear la tabla CompraArticulos");
                                    })
                            })
                            .catch((err: any) => {
                                console.log(`${err}`);
                                console.log("No se ha podido crear la tabla articulos");
                            })

                    })
                    .catch((err: any) => {
                        console.log(`${err}`);
                        console.log("No se ha podido crear la tabla Compra");
                    })

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
