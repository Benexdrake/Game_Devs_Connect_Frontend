import { getRequests } from "@/services/request_services";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{
    const result = await getRequests()
    res.status(200).json(result);
}
