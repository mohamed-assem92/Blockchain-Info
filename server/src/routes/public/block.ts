import {
  FastifyPluginAsync, FastifyPluginOptions, FastifyReply, FastifyRequest,
} from 'fastify';
import axios from '../../utils/axiosInstance';
import { BlocksQueryRequest, BlockByHashQueryRequest } from '../../types';

const blocksRoutes: FastifyPluginAsync<FastifyPluginOptions> = async (fastify) => {
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      querystring: {
        $ref: 'getBlocks#',
      },
      tags: ['Blocks'],
      description: 'Get Blocks',
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const { redisClient } = fastify as any;
      const { limit, offset } = request.query as BlocksQueryRequest;
      const yesterdayInMillies = new Date((new Date()).valueOf() - 1000 * 60 * 60 * 24).getTime();
      const url = `blocks/${yesterdayInMillies}?format=json`;
      redisClient.get(`blocks${limit}${offset}`, async (err, data) => {
        if (data) {
          const resultData = JSON.parse(data);
          reply.status(200).send(resultData);
        } else {
          const blocks = await axios.get(url);
          const blocksData = [...blocks.data].splice(offset, limit);
          const blocksResult = { data: blocksData, totalCount: blocks.data.length };
          redisClient.setex(`blocks${limit}${offset}`, 600, JSON.stringify(blocksResult));
          reply.status(200).send(blocksResult);
        }
      });
    },
  });

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
      tags: ['Blocks'],
      description: 'Get Block by Hash',
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const { hash } = request.params as BlockByHashQueryRequest;
      const { redisClient } = fastify as any;
      redisClient.get(hash, async (err, data) => {
        if (data) {
          const resultData = JSON.parse(data);
          reply.status(200).send(resultData);
        } else {
          const block = await axios.get(`rawblock/${hash}?format=json`);
          const blockResult = {
            size: block.data.size,
            version: block.data.ver,
            merkelRoot: block.data.mrkl_root,
            bits: block.data.bits,
            fee: block.data.fee,
            nTXs: block.data.n_tx,
            weight: block.data.weight,
            height: block.data.height,
            blockIndex: block.data.block_index,
            previousHash: block.data.prev_block,
            nonce: block.data.nonce,
            receviedTime: block.data.time,
            tx: block.data.tx.map((transaction) => ({
              hash: transaction.hash,
              fee: transaction.fee,
              time: transaction.time,
            })),
          };
          redisClient.set(hash, JSON.stringify(blockResult));
          reply.status(200).send(blockResult);
        }
      });
    },
  });
};

export default blocksRoutes;
