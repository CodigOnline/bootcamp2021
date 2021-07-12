import {Sequelize} from "sequelize";
import config from "../settings/config";

export const mysql = new Sequelize(
    String(config.bd.name),
    String(config.bd.user),
    String(config.bd.password),
    {
        port: config.bd.port,
        host: config.bd.url,
        dialect: 'mysql',
        logging: false
    }
)
