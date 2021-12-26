import { FastifyError, FastifyPluginAsync, FastifyReply, FastifyRequest, RequestPayload } from "fastify";
import fs from "fs";
import { pino, Level } from 'pino';
import path from "path";

import { configConst } from "./common/config";


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


fs.mkdir('./logs', { recursive: true }, (err) => {
  if (err) throw err;
});

const all: Level = "trace"
const error: Level = "error"
const streams = [
  {level: all, stream: fs.createWriteStream(path.resolve('./logs/all.stream.log'), {flags: 'a'})},
  {level: error, stream: fs.createWriteStream(path.resolve('./logs/error.stream.log'), {flags: 'a'})}, 
]

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


const streamsAPI = [
  {level: all, stream: fs.createWriteStream(path.resolve('./logs/api.all.log'), {flags: 'a'})},
  {level: error, stream: fs.createWriteStream(path.resolve('./logs/api.error.log'), {flags: 'a'})}, 
]

export const loggerPinoApi = pino(  {
  name: "api-logging-handling",
  level: level(configConst.LOG_LEVEL),
}, pino.multistream(streamsAPI));

export const handlerLogBody = (req: FastifyRequest, reply: FastifyReply, done: CallableFunction): void => {
  if (req.body) {
    req.log.info({ body: req.body }, 'parsed body')
  }
  done()
}

export const handlerApiLog = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  // const [s, n] = process.hrtime(request.apiLogger.t)
  // const isSensitive = sensitiveUrls.indexOf(request.url) > -1 && reply.statusCode < 400
  loggerPinoApi[(reply.statusCode >= 500) ? 'error' : (reply.statusCode >= 400) ? 'warn' : 'debug']({
    msg: [
      request.id, request.ip, request.method, JSON.stringify(request.body),
      reply.statusCode, request.url, JSON.stringify(request.params),
      // (s > 0) ? `${(s + n / 1e9).toFixed(3)}s` : `${(n / 1e6).toFixed(3)}ms`,
      // isSensitive ? null : request.apiLogger.req,
      // isSensitive ? null : request.apiLogger.res
    ].filter(e => !!e).join(' ')
  })
}
