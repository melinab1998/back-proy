import winston from "winston";
import config from "../config.js";

let logger

const logLevels = {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    }

if(config.NODE_ENV==="dev"){
     logger = winston.createLogger({
        level: "debug",
        levels: logLevels,
        transports: [new winston.transports.Console()]
    });
}

if(config.NODE_ENV==="prod"){
    logger = winston.createLogger({
        levels: logLevels,
        transports: [new winston.transports.Console({level: 'info'}), new winston.transports.File({filename: './errors.log', level: 'error'})]
})
}

export {logger}

