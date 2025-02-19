import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

export const secureCheck = async (req: NextApiRequest, res: NextApiResponse) =>
{
    if(process.env.NODE_ENV === 'development') return true;

    const session = await getServerSession(req,res,authOptions);
    if(session) return true;

    return false;
}