import { NextApiRequest, NextApiResponse } from "next";
import { UserService } from "./user.service";

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
export const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  const users = await UserService.getAllUsers();
  res.status(200).json(users);
};

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Actualizar información de usuario (nombre o rol)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [ADMIN, USER]
 *     responses:
 *       200:
 *         description: Usuario actualizado
 */
export const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const updated = await UserService.updateUser(id as string, req.body);
  res.status(200).json(updated);
};
