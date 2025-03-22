import styles from '@/styles/modules/nav/navbar.module.css'
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { UserType } from '@/types/user';
import { useState } from 'react';
import PostRequest from '../request/new_request';

export default function Navbar(props:any)
{       
    const {data:session} = useSession();

    const [openNewPost, setOpenNewPost] = useState(false);
    const [notification, setNotification] = useState(false);

    const user = session?.user as UserType;

    return (
        <div className={styles.main}>
            <div className={styles.logo}><i className="fa-solid fa-khanda"></i></div>
            <ul className={styles.nav_buttons}>
                <Link href='/'><li className={styles.nav_button}><i className="fa-solid fa-house"></i></li></Link>
                <Link onClick={() => setNotification(false)} href='/notifications'><li className={styles.nav_button}><i style={{color:notification?'var(--color3)':''}} className="fa-solid fa-bell"></i></li></Link>
                <Link href='/'><li className={styles.nav_button}><i className="fa-solid fa-magnifying-glass"></i></li></Link>
                <Link href='/'><li className={styles.nav_button}><i className="fa-solid fa-envelope"></i></li></Link>
                <Link href='/'><li className={styles.nav_button}><i className="fa-solid fa-ellipsis"></i></li></Link>
                <li>
                    <div className={styles.nav_button} onClick={() => setOpenNewPost(!openNewPost)}>
                        <i className="fa-solid fa-circle-plus"></i>
                    </div>
                </li>
                { session &&
                (
                    <li>
                        <Link className={styles.nav_button} href={`/profile/${user?.id}`}>
                            <img className={styles.avatar} src={user.avatar} alt="Avatar"/>
                        </Link>
                    </li>   
                )}
            </ul>
            {openNewPost && (
                <PostRequest setOpen={setOpenNewPost}/>
            )}
        </div>
    )
}

