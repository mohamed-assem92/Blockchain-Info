import fastify from 'fastify';
import cors from 'fastify-cors';
import sensible from 'fastify-sensible';
import helmet from 'fastify-helmet';
import logger from './helpers/logger';
import config from './config';
import routes from './routes';
import redisConnector from './plugins/redis';

const {
  port,
  cors: { origins: corsOrigins },
} = config;

const server = fastify({
  ajv: {
    customOptions: {
      allErrors: true,
    },
  },
});

server.register(cors, { origin: corsOrigins });
server.register(helmet, {
  contentSecurityPolicy: false,
});
server.register(sensible);
server.register(redisConnector);
server.register(routes);
server.get('/ping', async (request, reply) => 'pong\n');

server.get('/', async (request, reply) => Date.now());

server.listen(port, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  logger.info(`Server listening at ${address}`);
});

process.on('unhandledRejection', (err) => {
  logger.error(err);
  process.exit(1);
});
