import { getUsers } from "@/services/user_services";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{
    const result = await getUsers()
    res.status(200).json(result);
}
