const swaggerJSDoc = require('swagger-jsdoc');

// Swagger definition options
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Amethyst API',
      description: 'A RESTful API for jokes, bible verses, quotes, math and science questions',
      version: '1.0.0',
      contact: {
        name: 'Carl Louise Romales',
        email: 'carl@hackmanila.tech',
      },
    },
    host: 'raspapi.hackmanila.tech',  // Adjust this based on your deployment
    basePath: '/',
  },
  apis: ['./routes/*.js'],  // Point to the route files for the API documentation
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerDocs;