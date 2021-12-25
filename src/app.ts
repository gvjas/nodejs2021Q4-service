import fastifyFactory, { FastifyInstance, FastifyLoggerInstance, FastifyLoggerOptions, FastifyRequest } from 'fastify';
import path from 'path';
import swagger, { SwaggerOptions } from 'fastify-swagger'

import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';

import { Logger } from './logger';
import { configConst } from './common/config';
import { access, createWriteStream } from 'fs';
// const fastify1= require('fastify')

// fastify1.register(require('fastify-api-logger'), {
//   user: 'userId',
//   level: 'debug',
//   prettyPrint: true, // You may want to turn off prettyPrint in production
//   sensitiveUrls: [], // Ignore sensitive URLs
// })
/**
 * @remarks
 * server's instance 
 * @param opts  - logger - is logging server's events?
 */
const fastify: FastifyInstance = fastifyFactory({logger: new Logger()})
//    {
//   level:configConst.LOG_LEVEL, 
//   stream: createWriteStream('access.log', {flags: 'a'}),
//   serializers: {
//     res (reply) {
//       // The default
//       return {
//         statusCode: reply.statusCode
//       }
//     },
//     req (req) {
//       return { method: req.method, url: req.url, params: req.params }
//     }
//   }
// }})

// fastify.addHook('preHandler', function (req, reply, done) {
//   if (req.body) {
//     req.log.info({ body: req.body }, 'parsed body')
//   }
//   done()
// })
  // {level:'trace', stream: createWriteStream('access.log', {flags: 'a'})}})



// fastify.addHook('onRequest', handlerValidId)
  // /
// fastify.register({
//     logger: {
//       level: 'info',
//       serializers: {
//         function (req): {
//           return {
//             method: req.method,
//             url: req.url,
//             params: req.params,
//             headers: req.headers,
//             hostname: req.hostname,
//             remoteAddress: req.ip,
//             remotePort: req.socket.remotePort
//         }
//       }
//     }
//   })
// fastify.register(require('fastify-api-logger'), {
//   user: 'userId',
//   level: 'debug',
//   prettyPrint: true, // You may want to turn off prettyPrint in production
//   sensitiveUrls: [], // Ignore sensitive URLs
// })

/**
 * @remarks
 * add plugins and routes to the fastify for the REST API
 * @param plugin - event's object (GET, POST, PUT, DELETE)
 * @param opts - prefix for the url path
 */
fastify.register(userRouter, { prefix: '/users' });
fastify.register(boardRouter, { prefix: '/boards'});
fastify.register(taskRouter, { prefix: '/boards/:boardId/tasks' })


const swaggerOpts: SwaggerOptions = {
  exposeRoute: true,
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
    baseDir: ''
  },
}

/**
 * @remarks
 * add plugins and routes to the fastify
 * @param plugin - event's object (DOC for testing)
 * @param opts - swagger document's options
 */
fastify.register(swagger, swaggerOpts);

export default fastify;
