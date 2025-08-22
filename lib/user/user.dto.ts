export interface UserDTO {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
}

export interface UpdateUserDTO {
  name?: string;
  role?: "ADMIN" | "USER";
}
