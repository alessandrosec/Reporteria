const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Backend Universidad Web Services",
    version: "1.0.0",
    description: "API Web Services Proyecto Universidad - Módulo de Reportería",
  },
  servers: [
    {
      url: "http://localhost:8081",
      description: "Servidor de desarrollo"
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Ingresa el token JWT obtenido del login"
      }
    }
  },
  tags: [
    {
      name: "Reportería",
      description: "Endpoints para generación de reportes y documentos estudiantiles"
    },
    {
      name: "Estudiante",
      description: "Gestión de estudiantes"
    },
    {
      name: "Servicios Up",
      description: "Verificación de servicios"
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ["./app/routes/*.js", "server.js"],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;