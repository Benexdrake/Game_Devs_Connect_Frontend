import LoginOutButton from "../login_btn";
import styles from '@/styles/modules/nav/avatar_option.module.css'

export default function AvatarOption(props:any)
{
    return (
        <div className={styles.option}>
            <LoginOutButton/>
        </div>
    )
}