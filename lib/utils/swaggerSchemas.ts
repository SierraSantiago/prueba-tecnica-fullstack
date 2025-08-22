// lib/utils/swaggerSchemas.ts
export const swaggerSchemas = {
  User: {
    type: "object",
    properties: {
      id: { type: "string", example: "user_123" },
      name: { type: "string", example: "Juan Pérez" },
      email: { type: "string", example: "juan@example.com" },
      phone: { type: "string", example: "+573001234567" },
      role: { type: "string", enum: ["ADMIN", "USER"], example: "USER" },
    },
    required: ["id", "name", "email", "role"],
  },

  UpdateUserDto: {
    type: "object",
    properties: {
      name: { type: "string", example: "Juan Pérez" },
      role: { type: "string", enum: ["ADMIN", "USER"], example: "USER" },
    },
  },

  Movement: {
    type: "object",
    properties: {
      id: { type: "number", example: 1 },
      concept: { type: "string", example: "Compra supermercado" },
      amount: { type: "number", example: 250.75 },
      date: { type: "string", format: "date-time", example: "2025-08-22T00:00:00.000Z" },
      user: {
        type: "object",
        properties: {
          id: { type: "string", example: "user_123" },
          name: { type: "string", example: "Juan Pérez" },
        },
      },
    },
    required: ["id", "concept", "amount", "date", "user"],
  },

  CreateMovementDto: {
    type: "object",
    properties: {
      concept: { type: "string", example: "Compra supermercado" },
      amount: { type: "number", example: 250.75 },
      date: { type: "string", format: "date-time", example: "2025-08-22T00:00:00.000Z" },
      userId: { type: "string", example: "user_123" },
    },
    required: ["concept", "amount", "date", "userId"],
  },
};
