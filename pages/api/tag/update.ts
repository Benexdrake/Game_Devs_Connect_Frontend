import { secureCheck } from "@/lib/api";
import { updateTag } from "@/services/tag_service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{
    const secure = await secureCheck(req,res)

    if(!secure)
    {
        res.status(500).send('Go away!!!')
        return;
    }

    const tag = req.body;

    const result = await updateTag(tag)
    res.status(200).json(result);
}
