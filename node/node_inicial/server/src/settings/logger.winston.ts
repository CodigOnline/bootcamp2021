

import winston from 'winston'


const Log = winston.createLogger({
    level:'info',
    format: winston.format.combine(
        winston.format.timestamp(({format:'DD/MM/YYYY HH:mm:ss'})),
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
            level:'info'
        }),
        new winston.transports.Console({
            format:winston.format.combine(
                winston.format.cli()
            )
        })
    ]
})

export default Log;
