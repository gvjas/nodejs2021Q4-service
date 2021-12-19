const fastify = require('fastify')({ logger: true });
const path = require('path');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

fastify.register(userRouter, { prefix: '/users' });
fastify.register(boardRouter, { prefix: '/boards'});
fastify.register(taskRouter, { prefix: '/boards/:boardId/tasks' })

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
  },
});

module.exports = fastify;
