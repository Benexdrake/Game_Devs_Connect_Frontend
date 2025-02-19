import { secureCheck } from "@/lib/api";
import { addProject } from "@/services/backend/project_services";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{
    const secure = await secureCheck(req,res)

    if(!secure)
    {
        res.status(500).send('Go away!!!')
        return;
    }

    const project = req.body;

    const result = await addProject(project)

    res.status(200).json(result);
}
