import express from 'express'
import UsuarioRouter from './routes/usuarios.routes'

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
        //ESCRIBIREMOS LAS PROPIEDADES NECESARIAS PARA EXPRESS
    }

    private middlewares() {
        this.app.use(express.json()) //TRANSFORMAR EL BODY EN UN JSON
    }

    private routes() {
        this.app.use('/usuarios', UsuarioRouter)
    }

    private init() {
        this.app.listen(3000, function init() {
            console.log("Servidor inicado en el puerto 3000");
        })
    }

}

new App();
