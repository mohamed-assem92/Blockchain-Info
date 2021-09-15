export default {
  getTransactionByHash: {
    title: 'Get Transaction by Hash',
    $id: 'getTransactionByHash',
    type: 'object',
    required: ['hash'],
    properties: {
      hash: { type: 'string' },
    },
    additionalProperties: false,
  },
};
