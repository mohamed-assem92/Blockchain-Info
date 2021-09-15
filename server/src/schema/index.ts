import { FastifyPluginCallback, FastifyPluginOptions } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import blocks from './blocks';
import transactions from './transactions';

const addSchemaToContext: FastifyPluginCallback<FastifyPluginOptions> = (fastify, opts, done) => {
  const schemas = [
    blocks,
    transactions,
  ];
  schemas.forEach((schema) => Object.values(schema).forEach((s) => fastify.addSchema(s)));
  done();
};

const addSchemaToContextPlugin = fastifyPlugin(addSchemaToContext, { name: 'add-schema-to-context' });

export default addSchemaToContextPlugin;
