import { configConst } from './common/config';
import fastify from './app';


const PORT = configConst.PORT || 4000

/**
 * Start server of fastify
 * @returns type Promise<void>
 */
const startServer = async (): Promise<void> => {
  try {
    await fastify.listen(PORT, (): void =>{ 
      console.log(`App is running on http://localhost:${PORT}`)}
    );

  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

startServer()