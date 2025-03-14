import type { NextApiRequest, NextApiResponse } from "next";
import { secureCheck } from "@/lib/api";
import {IncomingForm} from "formidable";
import { addFileS3 } from "@/lib/aws";
import { APIResponse } from "@/types/api_response";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse)
{
    const secure = await secureCheck(req,res)

    const {id} = req.query;
    
    if(!secure)
    {
        res.status(500).send('Go away!!!')
        return;
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
            
            const response = await addFileS3(f, id as string);
    
            res.status(200).json(response)
        } 
        catch (error)
        {
            const apiResponse:APIResponse = {message:error as string, status:false, data:{}}
            console.error('ERROR',error);
            return apiResponse;
        }
}