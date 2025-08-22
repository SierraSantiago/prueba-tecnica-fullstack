import { prisma } from "../prisma/prisma";
import { CreateMovementDTO } from "./movement.dto";

export const MovementDao = {
  findAll: () =>
    prisma.movement.findMany({
      select: {
        id: true,
        concept: true,
        amount: true,
        date: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { date: "desc" },
    }),

  create: (data: CreateMovementDTO) =>
    prisma.movement.create({
      data,
      select: {
        id: true,
        concept: true,
        amount: true,
        date: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }),
};
