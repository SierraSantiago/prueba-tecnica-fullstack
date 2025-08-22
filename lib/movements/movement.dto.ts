export interface MovementDTO {
  id?: string;
  type: "INGRESO" | "EGRESO";
  amount: number;
  description?: string;
  date: Date;
  userId: string;
}
