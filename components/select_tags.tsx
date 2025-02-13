import styles from '@/styles/modules/select_tags.module.css'
import { useState } from 'react'
export default function SelectTags(props:any)
{
    const [open, setOpen] = useState(false)
    const [tags, setTags] = useState<string[]>([])

    const {setTagsHandler} = props;


    const onSelectOpenTagsClickHandler = () =>
    {
        setOpen(!open);
    }

    const onSelectTagsHandler = (tag:string) =>
    {
        const t = tags.find(x => x === tag);
        if(t)
            setTags(tags.filter(t => t !== tag))
        else
            setTags([...tags,tag])
    }

    setTagsHandler(tags);
    

    return (
        <>
            <div className={styles.tags} onClick={() => onSelectOpenTagsClickHandler()}>
                <span className={styles.select_btn}>Select Tags</span>
                <span className={styles.arrow_dwn}>
                    <i className="fa-solid fa-chevron-down"></i>
                </span>
            </div>
            {open && (

                <ul className={styles.list_items}>
                <li className={styles.item} onClick={() => onSelectTagsHandler('Animation')}>
                    <span className={styles.checkbox}>
                        <i className={"fa-solid fa-check "+ styles.check_icon}></i>
                    </span>
                    <span className={styles.item_text}>Animation</span>
                </li>
                <li className={styles.item} onClick={() => onSelectTagsHandler('Model')}>
                    <span className={styles.checkbox}>
                        <i className={"fa-solid fa-check "+ styles.check_icon}></i>
                    </span>
                    <span className={styles.item_text}>Model</span>
                </li>
                <li className={styles.item} onClick={() => onSelectTagsHandler('2D')}>
                    <span className={styles.checkbox}>
                        <i className={"fa-solid fa-check "+ styles.check_icon}></i>
                    </span>
                    <span className={styles.item_text}>2D</span>
                </li>
            
            </ul>
            )}
        </>
    )
}