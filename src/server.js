// const fastify = require('fastify')({ logger: true });
const { PORT } = require('./common/config');

const fastify = require('./app');
// const app1 = require('./app');

// app.listen(3000, () =>
//   console.log(`App is running on http://localhost:3000`)
// );


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