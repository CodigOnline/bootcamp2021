import dotenv from 'dotenv'

dotenv.config();

const config = {
    app: {
        port: process.env.SERVER_PORT || 3000
    },
    bd: {
        port: 3306,
        url: process.env.BD_URL,
        name: process.env.BD_NAME,
        user: process.env.BD_USER,
        password: process.env.BD_PASSWORD
    },
    jwt:{
        clave:process.env.TOKEN_CLAVE
    }
}
export default config;
