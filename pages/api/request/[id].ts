import { getRequestById } from "@/services/backend/request_services";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{
    const id = req.query.id

    const session = await getServerSession(req,res,authOptions);


    // Backdoor for Postman Documentation
    if(session || `${req.headers.authorization}` === `Bearer ${authOptions.secret}`)
    {
        const result = await getRequestById(id as string)
        res.status(200).json(result);
    }
    res.status(500).send('Go away!!!')
}
