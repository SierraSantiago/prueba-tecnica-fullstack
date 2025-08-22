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
 *   get:
 *     summary: Obtener un usuario por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
export const getUserById = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const user = await UserService.getUserById(id as string);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
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
