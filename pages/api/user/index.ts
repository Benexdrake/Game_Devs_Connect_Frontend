import { getUsers } from "@/services/user_services";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse)
{   

    // Muss weg finden, damit nur ein Authorisierter User drauf zugreifen kann.
    
    const result = await getUsers()
    res.status(200).json(result);
}
