import styles from '@/styles/modules/file/file.module.css'
import { FileType } from '@/types/file';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function File(props:any)
{
    const {fileId} = props;

    const [file, setFile] = useState<FileType>();

    useEffect(() =>
    {
        const getFile = async () =>
        {
            const response = await axios.get('http://localhost:3000/api/file/'+fileId).then(x => x.data)
            if(response.data)
                setFile(response.data)
        }

        getFile();
    },[])
    
    // console.log(file);
    

    return (
        <div>
            {file && (
                <a className={styles.link} href={`https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${file.id}/${file.name}`}>
                <div className={styles.download}>Download | {(file.size / 1024 / 1024).toFixed(2)}MB</div>
            </a>
            )}
        </div>
    )
}