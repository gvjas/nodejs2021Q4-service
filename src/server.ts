import configConst from './common/config.js';
import fastify from './app.js';


const {PORT} = configConst
const startServer = async () => {
  try {
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    await fastify.listen(PORT, () => 
      console.log(`App is running on http://localhost:${PORT}`)
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

startServer()