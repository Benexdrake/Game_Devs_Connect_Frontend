import { addComment } from "@/services/backend/comment_service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{
    
    const {comment, session} = req.body;
    
    if(!session) res.status(400).send('You shoul not pass!!!')

    const result = await addComment(comment)

    res.status(200).json(result)
}