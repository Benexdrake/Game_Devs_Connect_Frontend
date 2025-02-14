import styles from '@/styles/modules/nav/navbar.module.css'
import { useSession, signIn, signOut } from "next-auth/react";
import Link from 'next/link';
import { UserType } from '@/types/user';

export default function Navbar(props:any)
{       
    const {data:session} = useSession();
    const user = session?.user as UserType;
    return (
        <div className={styles.main}>
            <div className={styles.logo}><i className="fa-brands fa-fantasy-flight-games"></i></div>
                <ul className={styles.nav_buttons}>
                    <Link href='/'><li className={styles.nav_button}><i className="fa-solid fa-house"></i></li></Link>
                    <Link href='/'><li className={styles.nav_button}><i className="fa-solid fa-bell"></i></li></Link>
                    <Link href='/'><li className={styles.nav_button}><i className="fa-solid fa-magnifying-glass"></i></li></Link>
                    <Link href='/'><li className={styles.nav_button}><i className="fa-solid fa-envelope"></i></li></Link>
                    <Link href='/'><li className={styles.nav_button}><i className="fa-solid fa-ellipsis"></i></li></Link>
                    { session &&
                    (
                        <Link href='/'>
                            <li className={styles.nav_button}>
                                <img className={styles.avatar} src={user.avatar} alt="User Avatar"/>
                            </li>
                        </Link>
                    )}
                </ul>
        </div>
    )
}

