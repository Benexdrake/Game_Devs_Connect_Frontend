import { getUsers } from "@/services/user_services";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{   
    const {key} = req.query
    if(!key || key !== process.env.API_KEY) res.status(401).send('Missing or false key')

    const result = await getUsers()
    res.status(200).json(result);
}
