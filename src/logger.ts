import fastify, { FastifyLogFn, FastifyLoggerInstance, FastifyLoggerOptions } from "fastify";
import { Bindings } from "fastify/types/logger";
// import {apiLoggerPlugin} from 'fastify-api-logger'
type Request = {[key: string]: string}
export class Logger<T> implements FastifyLoggerInstance{

    args?: T[];
    request?: Request
    // msg?: FastifyLogFn
    // serializers?: Object
    
  constructor(...args: T[]) {
    this.args = args
  }

    info (msg: unknown):void { console.log("myLogger", msg )};
    error (msg: unknown):void { console.log("myLogger", msg); };
    debug (msg: unknown):void { console.log("myLogger", msg); };
    fatal (msg: unknown):void { console.log("myLogger", msg); };
    warn (msg: unknown):void { console.log("myLogger", msg); };
    trace (msg: unknown):void { console.log("myLogger", msg); };
    child(bindings: Bindings): FastifyLoggerInstance {return this};
    // // this.serializers: {
    // res (reply: Reply): Object {
    //   // The default
    //   return {
    //     statusCode: reply.statusCode
    //   }
    // };
    // req (req: Reply) {
    //   return { method: req.method, url: req.url, params: req.params }
    // }
      // }
}
    // const fastify = require('fastify')

    // fastify.register(require('fastify-api-logger'), {
    //   user: 'userId',
    //   level: 'debug',
    //   prettyPrint: true, // You may want to turn off prettyPrint in production
    //   sensitiveUrls: [], // Ignore sensitive URLs
    // })

// log format:
// [ip] [user id?] [method] [status code] [path] [response time] [request payload?] [reply payload]

    // this.serializers: {
    //   req: (req): Object {
    //     return { url: req.url }
    //   }
    // }
    // serializers: (req: unknown): void {
    //             method: req.method,
    //             url: req.url,
    //             params: req.params,
    //             headers: req.headers,
    //             hostname: req.hostname,
    //             remoteAddress: req.ip,
    //             remotePort: req.socket.remotePort
    //       }
    // serializers?: {
    //   req?: (req: RawRequest) => {
    //     method?: string;
    //     url?: string;
    //     version?: string;
    //     hostname?: string;
    //     remoteAddress?: string;
    //     remotePort?: number;
    //     [key: string]: unknown;
    //   };
    //   err?: (err: FastifyError) => {
    //     type: string;
    //     message: string;
    //     stack: string;
    //     [key: string]: unknown;
    //   };
    //   res?: (res: RawReply) => {
    //     statusCode: string | number;
    //     [key: string]: unknown;
    //   };
    // };
    // level?: string;
    // file?: string;
    // genReqId?: (req: RawRequest) => string;
    // prettyPrint?: boolean | PrettyOptions;
    // stream?: FastifyLoggerStreamDestination;



// }
//   Logger.prototype.info = function (msg) { console.log("myLogger", msg); };
//   Logger.prototype.error = function (msg) { console.log("myLogger", msg); };
//   Logger.prototype.debug = function (msg) { console.log("myLogger", msg); };
//   Logger.prototype.fatal = function (msg) { console.log("myLogger", msg); };
//   Logger.prototype.warn = function (msg) { console.log("myLogger", msg); };
//   Logger.prototype.trace = function (msg) { console.log("myLogger", msg); };
//   Logger.prototype.child = function () { return new Logger() };

// import fastify from 'fastify'
// const f = fastify({
//   logger: {
//     level: 'info',
//     serializers: {
//       function (req): {
//         return {
//           method: req.method,
//           url: req.url,
//           params: req.params,
//           headers: req.headers,
//           hostname: req.hostname,
//           remoteAddress: req.ip,
//           remotePort: req.socket.remotePort
//       }
//     }
//   }
// // })

// const fastify = require('fastify')();
// fastify.register(require('fastify-log'))

