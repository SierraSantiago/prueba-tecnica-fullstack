import { PrismaClient } from "@prisma/client";

declare global {
  // Evita múltiples instancias en hot reload (dev)
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: ["query", "error"], 
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
