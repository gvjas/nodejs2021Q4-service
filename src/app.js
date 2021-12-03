const fastify = require('fastify')({ logger: true });

const path = require('path');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

// const userRouter = require('./resources/users/user.router');

// fastify.get('/', (req, reply) => {
//   reply.send('Hello World!');
// });

fastify.register(userRouter);
fastify.register(boardRouter);
fastify.register(taskRouter);

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
  },
});
// fastify.register('/users', userRouter);
// app.register(boardRouter);
// const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

// app.use(express.json());

// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// fastify.route('/', (req, res, next) => {
//   if (req.originalUrl === '/') {
//     res.send('Service is running!');
//     return;
//   }
//   next();
// });
// fastify.register('/users', userRouter);
// app.use('/users', userRouter);

module.exports = fastify;
