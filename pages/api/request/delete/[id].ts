import { deleteRequest } from "@/services/request_services";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{
    const {id} = req.query;

    const result = await deleteRequest(id as string)

    res.status(200).json(result);
}
