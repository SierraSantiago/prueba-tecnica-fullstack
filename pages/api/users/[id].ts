import { NextApiRequest, NextApiResponse } from "next";
import { updateUser } from "@/lib/user/user.controller";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PATCH") return updateUser(req, res);
  return res.status(405).json({ message: "Method not allowed" });
}
