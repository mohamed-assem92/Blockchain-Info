import { FastifyInstance } from 'fastify';
import blocksRoutes from './block';
import transactionsRoutes from './transaction';

const routes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.register(blocksRoutes, { prefix: '/blocks' });
  fastify.register(transactionsRoutes, { prefix: '/transactions' });
};

export default routes;
