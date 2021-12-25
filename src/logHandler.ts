import fastify, { FastifyLogFn, FastifyLoggerInstance, FastifyLoggerOptions, FastifyReply, FastifyRequest } from "fastify";
import { Bindings } from "fastify/types/logger";
import fs, { createWriteStream, mkdir } from "fs";
import { configConst } from "./common/config";
import logger, {Logger, pino, TransportMultiOptions, Level, levels} from 'pino';


const labels = {
  '10': 'trace',
  '20': 'debug',
  '30': 'info',
  '40': 'warn',
  '50': 'error',
  '60': 'fatal'
}

const all: Level = "trace"
const debug: Level = "debug"
const error: Level = "error"

mkdir('./logs', { recursive: true }, (err) => {
  if (err) throw err;
});

const streams = [
  // {stream: fs.createWriteStream('./logs/all.stream.log')},
  {level: all, stream: fs.createWriteStream('./logs/all.stream.log')},
  // {level: debug, stream: fs.createWriteStream('./logs/all.stream.log')},
  {level: error, stream: fs.createWriteStream('./logs/error.stream.log')}, 
]

const level = configConst.LOG_LEVEL

export const loggerPino = pino(  {
  name: "logging-handling",
  level: "info", 
  serializers: {
    res (reply: FastifyReply) {
      // The default
      return {
        statusCode: reply.statusCode
      }
    },
    req (req: FastifyRequest) {
      return { method: req.method, url: req.url, params: req.params }
    }
  }
}, pino.multistream(streams));

process.on('uncaughtException', pino.final(loggerPino, (err, finalLogger) => {
  finalLogger.error(err, 'uncaughtException')
  process.exit(1)
}))

process.on('unhandledRejection', pino.final(loggerPino, (err, finalLogger) => {
  finalLogger.error(err, 'unhandledRejection')
  process.exit(1)
}))