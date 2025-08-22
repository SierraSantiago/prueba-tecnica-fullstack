import { UserDao } from "./user.dao";
import { UpdateUserDTO, UserDTO } from "./user.dto";

export const UserService = {
  getAllUsers: async (): Promise<UserDTO[]> => {
    return UserDao.findAll();
  },

  getUserById: async (id: string): Promise<UserDTO | null> => {
    return UserDao.findById(id);
  },

  updateUser: async (id: string, dto: UpdateUserDTO): Promise<UserDTO> => {
    return UserDao.update(id, dto);
  },
};
