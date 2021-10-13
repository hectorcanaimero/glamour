const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: "1.0.0",
    title: "My API",
    description: "Documentation automatically generated by the <b>swagger-autogen</b> module."
  },
  host: "localhost:6970",
  basePath: "/",
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      "name": "User",
      "description": "Endpoints"
    }
  ],
  securityDefinitions: {
    apiKeyAuth:{
      type: "apiKey",
      in: "header",
      name: "X-API-KEY",
      description: "any description..."
    }
  },
  definitions: {
    Parents: {
      father: "Simon Doe",
      mother: "Marie Doe"
    },
    User: {
      name: "Jhon Doe",
      age: 29,
      parents: {
        $ref: '#/definitions/Parents'
      },
      diplomas: [
        {
          school: "XYZ University",
          year: 2020,
          completed: true,
          internship: {
            hours: 290,
            location: "XYZ Company"
          }
        }
      ]
    },
    AddUser: {
      $name: "Jhon Doe",
      $age: 29,
      about: ""
    }
  }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => require('./src/index'));