import { addFileS3 } from "@/lib/aws";
import type { NextApiRequest, NextApiResponse } from "next";
import {IncomingForm} from "formidable";
import { secureCheck } from "@/lib/api";
import { APIResponse } from "@/types/api_response";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse)
{
    if (req.method !== 'POST')  res.status(405).json("Method not allowed for File Upload");

    const secure = await secureCheck(req,res)

    if(!secure)
    {
        res.status(500).send('Go away!!!')
        return;
    }

    const {ownerId, fileId} = req.query;

    if(!ownerId)
    {
        const response:APIResponse = {message:'', status:false, data:{}}
        return res.status(200).json(response)
    }
    
    try 
    {
        const data: { files: any} = await new Promise((resolve, reject) =>
        {
            const form = new IncomingForm({ 
                uploadDir:process.env.UPLOADDIR,
                keepExtensions:false,
                maxFileSize: 200 * 1024 * 1024, // 200MB (Beispielwert)
                maxFieldsSize: 2 * 1024 * 1024, // 2MB für andere Felder (Beispielwert)
            });
        
            form.on('error', (err:any) => 
            {
                reject(new Error(err));
            });
        
            form.parse(req, (err, fields, files) => 
            {
                if (err)
                {
                    return reject(new Error(err));
                }

                resolve({files});
            });
        });
        
        const f = data.files['file'][0];
        
        const response = await addFileS3(f, fileId as string);

        res.status(200).json(response)
    } 
    catch (error)
    {
        console.error('ERROR',error);
    }
}