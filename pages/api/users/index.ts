import { NextApiRequest, NextApiResponse } from "next";
import { getUsers } from "@/lib/user/user.controller";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") return getUsers(req, res);
  return res.status(405).json({ message: "Method not allowed" });
}
