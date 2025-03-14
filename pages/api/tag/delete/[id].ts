import { secureCheck } from "@/lib/api";
import { deleteTag } from "@/services/tag_service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{
    const secure = await secureCheck(req,res)

    if(!secure)
    {
        res.status(500).send('Go away!!!')
        return;
    }

    const id = req.query.id as string

    const result = await deleteTag(id)
    res.status(200).json(result);
}
