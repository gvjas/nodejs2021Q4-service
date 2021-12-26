import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import fs from "fs";
import { pino, Level } from 'pino';
import path from "path";

import { configConst } from "./common/config";

/**
 * @remarks
 * for the pino(fastify) log level, e.g. .env LOG_LEVEL=30 returns "info"
 * @param LOG_LEVEL - of the config and .env 
 * @returns level for the pino logging
 */
const level = (LOG_LEVEL?: string): string|undefined => {
  let level;
  if (LOG_LEVEL) {
    level = LOG_LEVEL.toLowerCase()
    if (level === '60') {
      level = "fatal"
    } else if (level === '50' || level === '0') {
      level = "error"
    } else if (level === '40' || level === '1') {
      level = "warn"
    } else if (level === '30' || level === '2') {
      level = "info"
    } else if (level === '20' || level === '3') {
      level = "debug"
    } else if (level === '10' || level === '4' || level === 'all') {
      level = "trace"
    } 
  }
  return level
}

/**
 * create logs directory
 * @param path - logs directory
 * @param options - options
 * @param callback - for the error
 */
fs.mkdir('./logs', { recursive: true }, (err): void => {
  if (err) throw err;
});

const all: Level = "trace"
const error: Level = "error"
/**
 * create streams
 * @param level - must be Level type
 * @param stream - stream
 */
const streams = [
  {level: all, 
    stream: fs.createWriteStream(path.resolve('./logs/trace.log'), {flags: 'a'})},
  {level: error, 
    stream: fs.createWriteStream(path.resolve('./logs/error.log'), {flags: 'a'})}, 
]

/**
 * for the fastify logger
 * @param options - logs options
 */
export const loggerPino = pino(  {
  name: "logging-handling",
  level: level(configConst.LOG_LEVEL),
  serializers: {
    res (reply: FastifyReply) {
      // The default
      return {
        statusCode: reply.statusCode
      }
    },
    err: (err: FastifyError) => {
      type: err.code;
      message: err.message;
      stack: err.stack;
    },
    req (request: FastifyRequest) {
      return {         
        method: request.method,
        url: request.url,
        parameters: request.params,
        path: request.routerPath,
        headers: request.headers }
    }
  }
}, pino.multistream(streams));

/**
 * create streams API
 * @param level - must be Level type
 * @param stream - stream
 */
const streamsAPI = [
  {level: all, 
    stream: fs.createWriteStream(path.resolve('./logs/api.debug.log'), {flags: 'a'})},
  {level: error, 
    stream: fs.createWriteStream(path.resolve('./logs/api.error.log'), {flags: 'a'})}, 
]

/**
 * @remarks
 * for the API hookHandler fastify body's logger 
 * @param req - the fastify request object
 * @param reply - the fastify reply object
 * @param done - hook done
 * @returns void (loging body)
 */
export const handlerLogBody = (req: FastifyRequest, reply: FastifyReply, done: CallableFunction): void => {
  if (req.body) {
    req.log.info({ body: req.body }, 'parsed body')
  }
  done()
}

/**
 * @remarks
 * for the API hookHandler fastify logger 
 * (e.g. API levels for the handled errors == fastify levels for the unhandled errors)
 * @param options - logs options
 */
export const loggerPinoApi = pino(  {
  name: "api-logging-handling",
  level: level(configConst.LOG_LEVEL),
}, pino.multistream(streamsAPI));


/**
 * @remarks
 * for the API hook fastify logger 
 * (e.g. API levels for the handled warning, errors, debug 
 * == fastify levels for the unhandled errors, errors, debug)
 * @param request - the fastify request object
 * @param reply - the fastify reply object
 * @returns type promise void
 */
export const handlerApiLog = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  loggerPinoApi[(reply.statusCode >= 500) ? 'error' : (reply.statusCode >= 400) ? 'warn' : 'debug']({
    msg: [
      request.id, request.ip, request.method, JSON.stringify(request.body),
      reply.statusCode, request.url, JSON.stringify(request.params),
    ].filter(e => !!e).join(' ')
  })
}
