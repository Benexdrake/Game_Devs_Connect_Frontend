import { User } from "@/types/user";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginOutButton()
{
    const {data:session} = useSession();

    if(session)
    {
        const user = session.user as User;

        return (
            <>
                Signed In
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}