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
 * @param opts  - logger - loggerPino logging server's events
 */
const fastify: FastifyInstance = fastifyFactory({logger: loggerPino})

/**
 * @remarks
 * logger's hook - logging body
 */
fastify.addHook('preHandler', handlerLogBody)

/**
 * @remarks
 * set loging server's errors
 */
fastify.setErrorHandler(errorHandler)

/**
 * @remarks
 * API hook fastify logger 
 * (e.g. API levels for the handled errors == fastify levels for the unhandled errors)
 */
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

