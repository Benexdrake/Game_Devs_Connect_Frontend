import { authOptions } from "../pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

export const secureCheck = async (req: NextApiRequest, res: NextApiResponse) =>
{
    if(process.env.NODE_ENV === 'development') return true;

    const session = await getServerSession(req,res,authOptions);

    if(session) return true;

    // Should be False, but getServerSession dont work
    return false;
}

export const getUrlHandler = (frontend:boolean) =>
{
    if(frontend)
        return process.env.NEXT_PUBLIC_FRONTEND_URL+'/api';
    return process.env.BACKEND_URL;
}