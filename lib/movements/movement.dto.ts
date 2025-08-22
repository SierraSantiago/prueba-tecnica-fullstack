// dto para mostrar movimiento
export interface MovementDTO {
  id: number;
  concept: string;
  amount: number;
  date: Date;
  user: {
    id: string;
    name: string;
  };
}

// dto para crear movimiento
export interface CreateMovementDTO {
  concept: string;
  amount: number;
  date: Date;
  userId: string;
}
