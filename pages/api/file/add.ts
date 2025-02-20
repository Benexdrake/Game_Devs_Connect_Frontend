import { addFileS3 } from "@/lib/aws";
import { addFile, deleteFile } from "@/services/backend/file_service";
import type { NextApiRequest, NextApiResponse } from "next";
import {IncomingForm} from "formidable";
import PersistentFile from "formidable/PersistentFile";
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

    const data: { files: any, ownerId:any} = await new Promise((resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, (err: any, fields: any, files: any) => {
            
            if (err) reject({err});
            resolve({files, ownerId:fields.ownerId[0]});
        });
    });

    const f = data.files['file'][0];

    const file:FileType = {id:0, name:f.originalFilename, size:f.size, ownerId:data.ownerId, created: new Date().toUTCString()};
    
    // Post over Service to API returns id
    const fileResponse = await addFile(file)

    // // Upload File to AWS S3 with file and id returns true or false
    const result = await addFileS3(f, fileResponse.data);


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