import styles from '@/styles/modules/navbar.module.css'
import { useSession } from "next-auth/react"
import LoginOutButton from './login_btn';
import Link from 'next/link';
import { User } from '@/types/user';

export default function Navbar(props:any)
{       
    const {data:session} = useSession();
    const user = session?.user as User;
    return (
        <div className={styles.main}>
            <div className={styles.logo}><i className="fa-brands fa-fantasy-flight-games"></i></div>
                <ul className={styles.nav_buttons}>
                    <Link href='/'><li className={styles.nav_button}><i className="fa-solid fa-house"></i>HOME</li></Link>
                    <Link href='/'><li className={styles.nav_button}><i className="fa-solid fa-bell"></i>Notifications</li></Link>
                    <Link href='/'><li className={styles.nav_button}><i className="fa-solid fa-magnifying-glass"></i>Explore</li></Link>
                    <Link href='/'><li className={styles.nav_button}><i className="fa-solid fa-envelope"></i>Messages</li></Link>
                    <Link href='/'><li className={styles.nav_button}><i className="fa-solid fa-ellipsis"></i>More</li></Link>
                </ul>
                <div className={styles.user_field}>
                { session ? 
                    (
                        <div className={styles.user_field_items}>
                            <img className={styles.avatar} src={user.avatar} alt="User Avatar"/>
                            <div>
                                <div className={styles.username}>{user.username}</div>
                                <div className={styles.options}><i className="fa-solid fa-ellipsis"></i></div>
                            </div>
                        </div>
                    ) 
                    :
                    (
                        <LoginOutButton/>
                    )}
                </div>
        </div>
    )
}

