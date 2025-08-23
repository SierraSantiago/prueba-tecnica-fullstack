import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerSchemas } from './swaggerSchemas';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentación generada con Swagger para el backend',
    },
    components: {
      schemas: swaggerSchemas,
    },
  },
  apis: [
    './lib/user/user.controller.ts',
    './lib/movements/movement.controller.ts',
  ],
};

export const swaggerSpec = swaggerJSDoc(options);
