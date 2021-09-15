import redis from 'redis';
import { FastifyPluginAsync, FastifyPluginOptions } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import config from '../../config';
import logger from '../../helpers/logger';

const { redis: { url, port } } = config;

const redisConnector: FastifyPluginAsync<FastifyPluginOptions> = async (fastify) => {
  const client = redis.createClient(port, url);
  client.on('connect', () => {
    logger.info('Connected to Redis successfully');
  });
  client.on('error', (err) => {
    logger.error('lost connection with redis', err);
    process.exit(1);
  });
  fastify.decorate('redisClient', client);
  fastify.addHook('onClose', async () => client.quit(() => {
    logger.info('Redis client closed successfully');
  }));
};

const redisConnectorPlugin = fastifyPlugin(redisConnector, { name: 'redis' });

export default redisConnectorPlugin;
