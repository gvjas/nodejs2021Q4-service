import fastifyFactory, { FastifyInstance } from 'fastify';
import path from 'path';
import swagger, { SwaggerOptions } from 'fastify-swagger'

import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import { errorHandler } from './errorHandler';
import { loggerPino, handlerLogBody, handlerApiLog } from './logger';


/**
 * @remarks
 * server's instance 
 * @param opts  - logger - is logging server's events?
 */
const fastify: FastifyInstance = fastifyFactory({logger: loggerPino})

fastify.addHook('preHandler', handlerLogBody)

fastify.setErrorHandler(errorHandler)

fastify.addHook('onResponse', handlerApiLog)

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
function handlerApiLo(arg0: string, handlerApiLo: any) {
  throw new Error('Function not implemented.');
}

