import Comments from "@/components/comment/comments";
import NewComment from "@/components/comment/new_comment";
import FileList from "@/components/file/file_list";
import RequestBlock from "@/components/request/request";
import { getFilesByRequestId } from "@/services/file_service";
import { getRequestCheck } from "@/services/request_services";
import { UserType } from "@/types/user";
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

    const checkResponse = await getRequestCheck(id)

    if(!checkResponse.status)
    {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    
    const response = await getFilesByRequestId(id)
    console.log(response);
    
    
    return {
        props : {
            id,
            fileIds:response.data,
        }
    }
}