import { prisma } from '../prisma/prisma';

export const UserDao = {
  findAll: () =>
    prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    }),

  findById: (id: string) =>
    prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    }),

  update: (
    id: string,
    data: Partial<{ name: string; role: 'ADMIN' | 'USER' }>
  ) =>
    prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    }),
};
