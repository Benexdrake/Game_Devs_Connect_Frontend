import { getFileById } from "@/services/file_service";
import { getUserById } from "@/services/user_services";
import { APIResponse } from "@/types/api_response";
import { FileType } from "@/types/file";
import { UserType } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";

export default function FileListItem(props:any)
{
    const {fileId} = props;

    const [file, setFile] = useState<FileType>();
    const [user, setUser] = useState<UserType>();
    useEffect(() => 
    {
        const getFile = async () =>
        {
            const result = await getFileById(fileId);

            if(!result.status) return;
            
            const resultUser = await getUserById(result.data.ownerId)
            if(!resultUser.status) return;

            setFile(result.data);
            setUser(resultUser.data);
        }
        
        getFile();

    },[])

    return (
        <div style={{display:"grid", gridTemplateColumns:'repeat(3, 1fr)', width:'100%', textAlign:'center'}}>
            <div style={{justifySelf:'start'}}>
                {user ? user.username : <div></div>}
            </div>
            <div>
                {file ? file.name  : <div></div>}
            </div>
            <div style={{justifySelf:'end'}}>
                {file && Math.round(file.size / 1024 / 1024 * 100) / 100} MB
            </div>
        </div>
    )
}