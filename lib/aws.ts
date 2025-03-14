'use server'

import AWS from 'aws-sdk';
import fs from 'fs';
import { FileType } from "@/types/file";

// Get File from S3 by ID
export const getFileS3 = async () =>
{

}

// Add File to S3
export const addFileS3 = async (file:any, id:string) =>
{
    try {
        const s3 = new AWS.S3();

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME as string,
            Key: `${id}/${file.originalFilename}`,
            Body: fs.createReadStream(file.filepath),
          };

        console.log(s3.listBuckets());
        

        return await new Promise((resolve, reject) =>
        {
            s3.upload(params, (err:any,data:any) =>
            {
                if(err)
                {
                    console.error('Fehler beim Hochladen in S3:', err);
                    resolve(false)
                }
                console.log('Datei erfolgreich in S3 hochgeladen:', data.Location);
                resolve(true)
            })
        })
    } 
    catch (error: any) 
    {
        return false;
    }
}


// Update File at S3
export const updateFileS3 = async (file:FileType) =>
{

}

// Delete File from S3
export const deleteFileS3 = async (id:number) =>
{

}