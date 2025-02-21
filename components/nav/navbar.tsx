import styles from '@/styles/modules/nav/navbar.module.css'
import { useSession, signIn, signOut } from "next-auth/react";
import Link from 'next/link';
import { UserType } from '@/types/user';
import { useState } from 'react';
import PostRequest from '../request/post_request';
import AvatarOption from './option';

export default function Navbar(props:any)
{       
    const {data:session} = useSession();

    const [openNewPost, setOpenNewPost] = useState(false);
    const [openAvatarOption, setOpenAvatarOption] = useState(false);

    const user = session?.user as UserType;

    const onClickHander = (e:any) =>
    {
        e.preventDefault();

        if(e.target.className.includes('post-background'))
            setOpenNewPost((prev:boolean) => !prev); 
        else if(e.target.className.includes('option-background'))
            setOpenAvatarOption((prev:boolean) => !prev); 
    }

    

    return (
        <div className={styles.main}>
            <div className={styles.logo}><i className="fa-brands fa-fantasy-flight-games"></i></div>
                <ul className={styles.nav_buttons}>
                    <Link href='/'><li className={styles.nav_button}><i className="fa-solid fa-house"></i></li></Link>
                    <Link href='/'><li className={styles.nav_button}><i className="fa-solid fa-bell"></i></li></Link>
                    <Link href='/'><li className={styles.nav_button}><i className="fa-solid fa-magnifying-glass"></i></li></Link>
                    <Link href='/'><li className={styles.nav_button}><i className="fa-solid fa-envelope"></i></li></Link>
                    <Link href='/'><li className={styles.nav_button}><i className="fa-solid fa-ellipsis"></i></li></Link>
                    <li className={styles.nav_button} onClick={() => setOpenNewPost(!openNewPost)}><i className="fa-solid fa-circle-plus"></i></li>
                    { session &&
                    (
                        <li className={styles.nav_button} onClick={() => setOpenAvatarOption(!openAvatarOption)}>
                            <img className={styles.avatar} src={user.avatar} alt="Avatar"/>
                        </li>   
                    )}
                </ul>
                {openAvatarOption && (
                    <div className={styles.avatar_option + '  option-background'} onClick={onClickHander}>
                        <AvatarOption/>
                    </div>
                )}
                {openNewPost && (
                    <PostRequest setOpen={setOpenNewPost}/>
                )}

        </div>
    )
}

