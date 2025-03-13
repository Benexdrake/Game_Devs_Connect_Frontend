import { secureCheck } from "@/lib/api";
import { getProjectById } from "@/services/project_services";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{
    const secure = await secureCheck(req,res)

    if(!secure)
    {
        res.status(500).send('Go away!!!')
        return;
    }

    const id = req.query.id

    const result = await getProjectById(id as string)

    res.status(200).json(result);
}
