import { FastifyPluginCallback, FastifyPluginOptions } from 'fastify';
import fastifySwagger, { SwaggerOptions } from 'fastify-swagger';
import publicRoutes from './public';
import swagger from './swagger';
import addSchemaToContext from '../schema';
import { errorHandler } from '../middlewares';

type printRoutesOpts = {
  commonPrefix?: boolean,
}
const routes: FastifyPluginCallback<FastifyPluginOptions> = (fastify, opts, done) => {
  fastify.register(addSchemaToContext);
  fastify.register(fastifySwagger, swagger as SwaggerOptions);
  fastify.register(publicRoutes, { prefix: '/' });
  fastify.setErrorHandler(errorHandler);
  fastify.ready(() => {
    const printRoutes: (opts: printRoutesOpts) => string = fastify.printRoutes.bind(fastify);
    console.info(printRoutes({
      commonPrefix: false,
    }));
  });
  done();
};

export default routes;
