import { NextApiRequest, NextApiResponse } from 'next';
import { MovementService } from './movement.service';

/**
 * @swagger
 * /api/movements:
 *   get:
 *     summary: Obtener todos los movimientos (ingresos y egresos)
 *     responses:
 *       200:
 *         description: Lista de movimientos
 */
export const getMovements = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const movements = await MovementService.getAllMovements();
  res.status(200).json(movements);
};

/**
 * @swagger
 * /api/movements:
 *   post:
 *     summary: Crear un nuevo movimiento (solo admin)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               concept:
 *                 type: string
 *               amount:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date-time
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Movimiento creado
 */
export const createMovement = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const dto = req.body;
  const movement = await MovementService.createMovement(dto);
  res.status(201).json(movement);
};
