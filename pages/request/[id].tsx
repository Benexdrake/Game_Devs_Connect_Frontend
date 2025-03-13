import Comments from "@/components/comment/comments";
import NewComment from "@/components/comment/new_comment";
import FileList from "@/components/file/file_list";
import RequestBlock from "@/components/request/request";
import { APIResponse } from "@/types/api_response";
import { UserType } from "@/types/user";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";

export default function Request(props:any)
{
    const {id, fileIds} = props;

    const {data:session} = useSession();

    return (
        <>
        {session && (
            <>
                <RequestBlock id={id} userId={(session.user as UserType).id}/>
                <>
                    <NewComment requestId={id} userId={(session.user as UserType).id}/>
                    {fileIds.length > 0 && (
                        <FileList fileIds={fileIds}/>
                    )}
                    <Comments parentId={id} userId={(session.user as UserType).id}/>
                </>
            </>
        )}
        </>
    )
}

export async function getServerSideProps(context:GetServerSidePropsContext)
{
    const id = context.query.id as string;

    const response = await axios<APIResponse>(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/request/files/${id}`).then(x => x.data)

    const checkResponse = await axios<APIResponse>(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/request/check/${id}`).then(x => x.data)

    const status = checkResponse.status

    if(!status)
    {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    
    return {
        props : {
            id,
            fileIds:response.data,
        }
    }
}