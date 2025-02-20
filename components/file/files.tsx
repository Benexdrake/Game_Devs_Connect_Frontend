import { FileType } from "@/types/file";
import { useEffect, useState } from "react";
import File from "./file";
import axios from "axios";

export default function Files()
{
    // fetch all files by Owner id
    const [files, setFiles] = useState<FileType[]>();

    useEffect(() =>
    {
        const getFiles = async () =>
        {
            const result = await axios.get('').then(x => x.data)
            
        }

        getFiles();
    }, [])


    return (
        <>
            {files && files.map(file => ( <File file={file} /> ))}
        </>
    )
}