export default {
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'Nuri Task API documentation',
      description: 'APIs docs',
      version: '0.1.0',
    },
    schemes: ['https', 'http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
  exposeRoute: true,
};
