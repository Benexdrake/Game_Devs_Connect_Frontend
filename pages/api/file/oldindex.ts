import type { NextApiRequest, NextApiResponse } from "next";
import {IncomingForm} from "formidable";
import AWS from 'aws-sdk';
import fs from 'fs';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> 
{
    if (req.method !== 'POST') 
    {
        // Return error 
        res.status(405).json("Method not allowed for File Upload");
    }
    
    try {
        const data: { files: any, path:any } = await new Promise((resolve, reject) => {
            const form = new IncomingForm();
            form.parse(req, (err: any, fields: any, files: any) => {
                if (err) reject({err});
                resolve({files, path:fields.path});
            });
        });

        const s3 = new AWS.S3();
        
        Object.keys(data.files).forEach((key) => 
        {            
            const file = data.files[key][0];
            const filepath = file.filepath;
            const filename = file.originalFilename;
            
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME as string,
                Key: `${data.path[0]}/${filename}`,
                Body: fs.createReadStream(filepath),
              };

            s3.upload(params, (err:any,data:any) =>
            {
                if(err)
                {
                    console.error('Fehler beim Hochladen in S3:', err);
                    return res.status(500).json({ error: 'Fehler beim Hochladen in S3' });
                }
                console.log('Datei erfolgreich in S3 hochgeladen:', data.Location);
                res.status(200).json({ message: 'Datei erfolgreich hochgeladen', location: data.Location });
            })

        });

        res.status(200).json("Successfully received file(s)");
    } 
    catch (error: any) 
    {
        res.status(500).json(error.message);
    }
};