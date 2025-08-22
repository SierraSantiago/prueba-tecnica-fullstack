import { PrismaClient } from "@prisma/client";

declare global {
  // Esto evita que TypeScript lo redeclare
  // y nos asegura que se mantenga la instancia en desarrollo
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"],
  });

// En desarrollo guardamos la instancia en global
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
