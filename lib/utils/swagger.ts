import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Documentación generada con Swagger para el backend",
    },
    
    components: {
      schemas: {
        CreateMovementDto: {
          type: "object",
          properties: {
            concept: { type: "string", example: "Compra supermercado" },
            amount: { type: "number", example: 250.75 },
            date: {
              type: "string",
              format: "date-time",
              example: "2025-08-22T00:00:00.000Z",
            },
            userId: { type: "string", example: "user_123" },
          },
          required: ["concept", "amount", "date", "userId"],
        },
      },
    },
  },
  apis: [ "./lib/user/user.controller.ts", "./lib/movements/movement.controller.ts",],
};

export const swaggerSpec = swaggerJSDoc(options);
