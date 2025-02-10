import { useSession, signIn, signOut } from "next-auth/react";

import styles from '@/styles/modules/sign_button.module.css'

export default function LoginOutButton()
{
    const {data:session} = useSession();

    if(session)
        return <button className={styles.button + " " + styles.logout} onClick={() => signOut()}>Logout</button>
    return <button className={styles.button + " " + styles.login} onClick={() => signIn()}>Login</button>
}