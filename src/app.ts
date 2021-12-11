import fastifyFactory, { FastifyInstance } from 'fastify';
import path from 'path';
import swagger from 'fastify-swagger'

import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';

const fastify: FastifyInstance = fastifyFactory({ logger: true });



fastify.register(userRouter, { prefix: '/users' });
fastify.register(boardRouter, { prefix: '/boards'});
fastify.register(taskRouter, { prefix: '/boards/:boardId/tasks' })

// @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
fastify.register(swagger, {
  exposeRoute: true,
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
  },
});

export default fastify;
