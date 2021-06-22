import express from 'express'
import UsuarioRoutes from './routes/usuarios.routes'
import ProductosRoutes from './routes/productos.routes'

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

    }

    private routes() {
        this.app.use('/usuarios', UsuarioRoutes)
        this.app.use('/productos', ProductosRoutes)
    }

    private init() {
        this.app.listen(3000, function init() {
            console.log("Servidor inicado en el puerto 3000");
        })
    }

}

new App();
