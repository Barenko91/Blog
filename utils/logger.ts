import { createLogger,format,http,transports } from "winston";
import winston from "winston/lib/winston/config";
const customLevels = {
  levels:{
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    verbose: 'cyan',
    debug: 'blue',
    silly: 'gray'
  }
}
const logger = createLogger({
  levels: customLevels.levels,
  level: 'info',
  format: format.combine(
      format.timestamp({
        format: 'DD-MM-YYYY HH:mm:ss'
      }),
      format.errors({stack:true}),
      format.splat(),
      format.json()
  ),
  defaultMeta:{service: 'user-service'},
  transports:[
    new transports.File({ filename:'error.log', level:'error'}),
    new transports.File({filename: 'combined.log', level:'info'}),
    new transports.File({filename: 'http.log', level:'http' })
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    ),
  }))
}
winston.addColors(customLevels.colors);
export default logger