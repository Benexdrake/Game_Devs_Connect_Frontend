import { secureCheck } from "@/lib/api";
import { getCommentIds } from "@/services/comment_service";
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
    if(!id) res.status(200).json(0);

    const result = await getCommentIds(id);

    res.status(200).json(result)
}