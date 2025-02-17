import Comments from "@/components/request/comments";
import NewComment from "@/components/request/new_comment";
import RequestBlock from "@/components/request/request";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";

export default function Request(props:any)
{

    const {id} = props;

    const [status, setStatus] = useState(false)

    return (
        <>
            <RequestBlock id={id} setStatus={setStatus}/>
            { status && (
                <>
                    <NewComment/>
                    <Comments parentId={id}/>
                </>
            )}
        </>
    )
}

export function getServerSideProps(context:GetServerSidePropsContext)
{
    const id = context.query.id;

    // Anfrage an API ob ID existiert, wenn nicht, redirect to home

    return {
        props : {
            id
        }
    }
}