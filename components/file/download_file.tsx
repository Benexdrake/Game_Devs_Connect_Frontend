import styles from '@/styles/modules/file/download_file.module.css'
import { FileType } from '@/types/file';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function DownloadFile(props:any)
{
    const {fileId} = props;

    const [file, setFile] = useState<FileType>();

    useEffect(() =>
    {
        const getFile = async () =>
        {
            const response = await axios.get(`${process.env.FRONTEND_URL}/api/file/${fileId}`).then(x => x.data)
            
            if(response.data)
                setFile(response.data)
        }

        getFile();
    },[])
    
    return (
        <div>
            {file && (
                <a href={`https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${file.id}/${file.name}`}>
                    <div className={styles.download}><i className="fa-solid fa-floppy-disk"></i> {(file.size / 1024 / 1024).toFixed(2)}MB</div>
                </a>
            )}
        </div>
    )
}