import { secureCheck } from "@/lib/api";
import { updateComment } from "@/services/comment_service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{
    const secure = await secureCheck(req,res)

    if(!secure)
    {
        res.status(500).send('Go away!!!')
        return;
    }

    const comment = req.body;

    console.log('COMMENT:', comment);

    const result = await updateComment(comment)

    res.status(200).json(result)
}