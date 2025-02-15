import { getTags } from "@/services/tag_service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{
    const result = await getTags()
    res.status(200).json(result);
}
