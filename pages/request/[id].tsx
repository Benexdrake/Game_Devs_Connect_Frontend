import Comments from "@/components/comment/comments";
import NewComment from "@/components/comment/new_comment";
import RequestBlock from "@/components/request/request";
import { UserType } from "@/types/user";
import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Request(props:any)
{

    const {id} = props;

    const [status, setStatus] = useState(false)

    const {data:session} = useSession();

    return (
        <>
        {session && (
            <>
                <RequestBlock id={id} setStatus={setStatus}/>
                { status && (
                    <>
                        <NewComment requestId={id} userId={(session.user as UserType).id}/>
                        <Comments parentId={id} userId={(session.user as UserType).id}/>
                    </>
                )}
            </>
        )}
        </>
    )
}

export async function getServerSideProps(context:GetServerSidePropsContext)
{
    const id = context.query.id as string;

    // Ping DB zum überprüfen ob die Request existiert,

    // const result = await checkRequest(id);

    // if(!result.status)
    // {
    //     return {
    //         redirect: {
    //             destination: '/',
    //             permanent: false
    //         }
    //     }
    // }
    
    return {
        props : {
            id
        }
    }
}