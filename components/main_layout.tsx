import styles from '@/styles/modules/main_layout.module.css'
import Navbar from './nav/navbar'
import CategoryBar from './nav/categorybar'
import Footer from './nav/footer'
import { useSession } from 'next-auth/react'
import LoginOutButton from './login_btn'

export default function MainLayout(props:any)
{
    const {data:session} = useSession();
    const {children} = props;

    return (
        <div className={styles.main}>
            {session && (
                <nav className={styles.sidebar}>
                    <Navbar/>
                </nav>
            )}
            <main className={styles.child}>
                { session ? ( <div>{children}</div> ) : ( <LoginOutButton/> )}
            </main>
            <nav className={styles.sidebar}>
                <CategoryBar/>
                <Footer/>
            </nav>
        </div>
    )
}