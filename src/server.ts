import { configConst } from './common/config';
import fastify from './app';


const PORT = configConst.PORT || 4000

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