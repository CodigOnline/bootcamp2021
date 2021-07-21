

import winston from 'winston'


const Log = winston.createLogger({
    level:'silly',
    format: winston.format.combine(
        winston.format.timestamp(({format:'DD/MM/YYYY HH:mm:ss'})),
        winston.format.colorize({
            all:true
        }),
        winston.format.printf(
            log=>
                `${log.level} - ${log.timestamp} - ${log.message}`)
    ),
    transports: [
        new winston.transports.File({
            filename :'logs/error.log',
            level:'warn'
        }),
        new winston.transports.File({
            filename:'logs/info.log',
            level:'silly'
        }),
        new winston.transports.Console({
            format:winston.format.combine(
                winston.format.cli(),
                winston.format.colorize({
                    all:true
                }),
                winston.format.timestamp(({format:'DD/MM/YYYY HH:mm:ss'})),
        winston.format.printf(
            log=>
                `${log.level} - ${log.timestamp} - ${log.message}`)
            )
        })
    ]
})

export default Log;
