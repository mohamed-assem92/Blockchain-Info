export default {
  getBlocks: {
    title: 'Get Blocks',
    $id: 'getBlocks',
    type: 'object',
    required: ['limit', 'offset'],
    properties: {
      limit: { type: 'number' },
      offset: { type: 'number' },
    },
    additionalProperties: false,
  },
  getBlockByHash: {
    title: 'Get Block by Hash',
    $id: 'getBlockByHash',
    type: 'object',
    required: ['hash'],
    properties: {
      hash: { type: 'string' },
    },
    additionalProperties: false,
  },
};
