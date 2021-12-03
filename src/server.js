const fastify = require('fastify')({ logger: true });
const { PORT } = require('./common/config');

const app = require('./app');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

app.listen(3000, () =>
  console.log(`App is running on http://localhost:3000`)
);

fastify.register(userRouter);
fastify.register(boardRouter);
fastify.register(taskRouter);

const startServer = async () => {
  try {
    await fastify.listen(PORT, () => 
      console.log(`App is running on http://localhost:${PORT}`)
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

startServer()