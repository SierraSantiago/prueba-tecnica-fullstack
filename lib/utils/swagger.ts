import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Documentación generada con Swagger para el backend",
    },
  },
  apis: ["./lib/user/user.controller.ts"], 
};

export const swaggerSpec = swaggerJSDoc(options);
