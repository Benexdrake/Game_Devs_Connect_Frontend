import { addFileS3 } from "@/lib/aws";
import { addFile, deleteFile } from "@/services/backend/file_service";
import type { NextApiRequest, NextApiResponse } from "next";
import {IncomingForm} from "formidable";
import { FileType } from "@/types/file";
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

    const {ownerId} = req.query;

    if(!ownerId)
    {
        const response:APIResponse = {message:'', status:false, data:{}}
        return res.status(200).json(response)
    }
    
    try 
    {
        const data: { files: any} = await new Promise((resolve, reject) => {
            const form = new IncomingForm({ 
                uploadDir:'/tmp/',
                keepExtensions:false,
                maxFileSize: 200 * 1024 * 1024, // 200MB (Beispielwert)
                maxFieldsSize: 2 * 1024 * 1024, // 2MB für andere Felder (Beispielwert)
            });
        
            form.on('error', (err:any) => {
                console.error("Fehler beim Parsen des Formulars:", err);
                reject(new Error(err));
            });
        
            form.parse(req, (err, fields, files) => {
                if (err) {
                    console.error("Fehler im form.parse-Callback:", err);
                    return reject(new Error(err));
                }

                resolve({files});
            });
        });
    
        console.log('Files2');
        
        const f = data.files['file'][0];

        const file:FileType = {id:0, name:f.originalFilename, size:f.size, ownerId:ownerId as string, created: new Date().toUTCString()};
        
        // Post over Service to API returns id
        const fileResponse = await addFile(file)
        console.log('Files3');

        // // Upload File to AWS S3 with file and id returns true or false
        const result = await addFileS3(f, fileResponse.data);
        console.log(result);
        

        if(!result)
        {
            const response = await deleteFile(fileResponse.data)
            response.data = 0;
            response.status = false;
            response.message = 'Error at Upload from File'
            res.status(200).json(response)
        }
    // if false, delete file from DB

    // // returning id 
        res.status(200).json(fileResponse)
    } 
    catch (error)
    {
        console.error('ERROR',error);
    }
    const response:APIResponse = {message:'', status:true, data:{}}
    res.status(200).json(response)
}