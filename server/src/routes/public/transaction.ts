import {
  FastifyPluginAsync, FastifyPluginOptions, FastifyReply, FastifyRequest,
} from 'fastify';
import axios from '../../utils/axiosInstance';
import { TransactionByHashQueryRequest } from '../../types';

const transactionsRoutes: FastifyPluginAsync<FastifyPluginOptions> = async (fastify) => {
  fastify.route({
    method: 'GET',
    url: '/:hash',
    schema: {
      params: {
        type: 'object',
        properties: {
          hash: {
            type: 'string',
          },
        },
      },
      tags: ['Transactions'],
      description: 'Get Transaction by Hash',
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const { hash } = request.params as TransactionByHashQueryRequest;
      const { redisClient } = fastify as any;
      redisClient.get(hash, async (err, data) => {
        if (data) {
          const resultData = JSON.parse(data);
          reply.status(200).send(resultData);
        } else {
          const transaction = await axios.get(`rawtx/${hash}?format=json`);
          redisClient.set(hash, JSON.stringify(transaction.data));
          reply.status(200).send(transaction.data);
        }
      });
    },
  });
};

export default transactionsRoutes;
