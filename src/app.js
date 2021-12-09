import fastifyFactory from 'fastify';
import path, { dirname } from 'path';
import swagger from 'fastify-swagger'

import { fileURLToPath } from 'url';

import userRouter from './resources/users/user.router.js';
import boardRouter from './resources/boards/board.router.js';
import taskRouter from './resources/tasks/task.router.js';

const fastify = fastifyFactory({ logger: true });

const __dirname = dirname(fileURLToPath(import.meta.url));

fastify.register(userRouter, { prefix: '/users' });
fastify.register(boardRouter, { prefix: '/boards'});
fastify.register(taskRouter, { prefix: '/boards/:boardId/tasks' })

fastify.register(swagger, {
  exposeRoute: true,
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
  },
});

export default fastify;
