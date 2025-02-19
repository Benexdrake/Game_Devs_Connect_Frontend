import { secureCheck } from "@/lib/api";
import { addComment } from "@/services/backend/comment_service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{
    const secure = await secureCheck(req,res)

    if(!secure)
    {
        res.status(500).send('Go away!!!')
        return;
    }

    const {comment} = req.body;
    
    const result = await addComment(comment)

    res.status(200).json(result)
}