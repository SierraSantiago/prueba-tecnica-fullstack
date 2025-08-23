//dto para mostrar usuario
export interface UserDTO {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

//dto para actualizar usuario
export interface UpdateUserDTO {
  name?: string;
  role?: 'ADMIN' | 'USER';
}
