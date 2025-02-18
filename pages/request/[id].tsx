import Comments from "@/components/request/comments";
import NewComment from "@/components/request/new_comment";
import RequestBlock from "@/components/request/request";
import { getRequestById } from "@/services/backend/request_services";
import { UserType } from "@/types/user";
import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Request(props:any)
{

    const {id, userId} = props;

    const [status, setStatus] = useState(false)

    const {data:session} = useSession();

    return (
        <>
        {session && (
            <>
                <RequestBlock id={id} setStatus={setStatus}/>
                { status && (
                    <>
                        <NewComment requestId={id} userId={(session.user as UserType).id} requestUserId={userId}/>
                        <Comments parentId={id} userId={(session.user as UserType).id} requestUserId={userId}/>
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

    const result = await getRequestById(id)

    // Anfrage an API ob ID existiert, wenn nicht, redirect to home

    return {
        props : {
            id,
            userId: result.data.user.id
        }
    }
}