import { deleteUser } from "@/services/user_services";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{
    const {id} = req.query;    

    const result = await deleteUser(id as string)

    res.status(200).json(result);
}
