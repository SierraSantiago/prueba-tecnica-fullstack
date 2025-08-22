import { NextApiRequest, NextApiResponse } from "next";
import { getMovements, createMovement } from "@/lib/movements/movement.controller";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return getMovements(req, res);
  }
  if (req.method === "POST") {
    return createMovement(req, res);
  }
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
