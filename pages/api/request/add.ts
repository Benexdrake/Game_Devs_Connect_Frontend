import { addRequest } from "@/services/request_services";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{
    const {request, session} = req.body;

    if(!session)
        res.status(400).send('No Access')

    const result = await addRequest(request)

    res.status(200).json(request);
}
