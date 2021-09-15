import { FastifyError, FastifyRequest, FastifyReply } from 'fastify';
import logger from '../helpers/logger';
import mapError from '../helpers/errorMapper';

export default async (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const mappedError = mapError(error);
  logger.log(mappedError.statusCode >= 500 ? 'error' : 'debug', error.message, error);
  reply
    .code(mappedError.statusCode)
    .type('application/json')
    .send(mappedError);
};
