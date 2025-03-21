'use server'

import { AxiosRequestConfig } from "axios";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth/next";
import { AuthType } from "@/types/auth";

export const secureCheck = async (req: NextApiRequest, res: NextApiResponse) =>
{
    // if(process.env.NODE_ENV === 'development') return true;

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

export const getAxiosConfig = (token:string) =>
{
    const axiosConfig:AxiosRequestConfig = {
        headers: {
            "APIKey": token
        }
    }

    return axiosConfig;
}