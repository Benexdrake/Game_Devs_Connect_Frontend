import { getComment } from "@/services/comment_service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{
    const id = parseInt(req.query.id as string)

    if(!id)
        res.status(200).json(0)

    const result = await getComment(id)

    res.status(200).json(result);
}