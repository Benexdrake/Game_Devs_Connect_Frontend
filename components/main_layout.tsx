import styles from '@/styles/modules/main_layout.module.css'
import Navbar from './nav/navbar'
import CategoryBar from './nav/categorybar'
import Footer from './nav/footer'
import { useSession } from 'next-auth/react'

export default function MainLayout(props:any)
{
    const {data:session} = useSession();
    const {children} = props;

    return (
        <div className={styles.main}>
            <nav className={styles.sidebar}>
                <Navbar/>
            </nav>
            <main className={styles.child}>
                { session ? ( <div>{children}</div> ) : ( <p>Please Log in...</p> )}
            </main>
            <nav className={styles.sidebar}>
                <CategoryBar/>
                <Footer/>
            </nav>
        </div>
    )
}