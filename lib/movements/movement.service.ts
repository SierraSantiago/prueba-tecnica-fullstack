import { MovementDao } from './movement.dao';
import { CreateMovementDTO, MovementDTO } from './movement.dto';

export const MovementService = {
  getAllMovements: async (): Promise<MovementDTO[]> => {
    return MovementDao.findAll();
  },

  createMovement: async (dto: CreateMovementDTO): Promise<MovementDTO> => {
    return MovementDao.create(dto);
  },
};
