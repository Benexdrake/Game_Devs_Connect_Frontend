import { updateComment } from "@/services/backend/comment_service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{
    const {comment} = req.body;

    const result = await updateComment(comment)

    res.status(200).json(result)
}