import { getUserById } from "@/services/user_services";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{
    const id = req.query.id

    const result = await getUserById(id as string)

    res.status(200).json(result);
}
