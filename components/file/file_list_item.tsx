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
            const result = await axios.get<APIResponse>(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/file/${fileId}`).then(x => x.data);

            if(!result.status) return;
            
            const resultUser = await axios.get<APIResponse>(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/user/short/${result.data.ownerId}`).then(x => x.data)
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