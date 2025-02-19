import { secureCheck } from "@/lib/api";
import { updateRequest } from "@/services/backend/request_services";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{
    const secure = await secureCheck(req,res)

    if(!secure)
    {
        res.status(500).send('Go away!!!')
        return;
    }

    const request = req.body;

    const result = await updateRequest(request)

    res.status(200).json(result);
}
