import { useState } from "react"


export default function Tag(props:any)
{
    const {tag, styles, onSelectTagsHandler} = props

    const [select, setSelect] = useState(false)

    const onSelectHandler = () =>
    {
        onSelectTagsHandler(tag)
        setSelect(!select)
    }

    return (
        <li>
            <div className={styles.item} onClick={() => onSelectHandler()}>
                <span className={styles.checkbox}>
                    {select ? 
                    (
                        <i className={"fa-solid fa-check "+ styles.check_icon}></i>
                    )
                    :
                    (
                        <i className={styles.check_icon}></i>
                    )}
                </span>
                <span className={styles.item_text}>{tag.name}</span>
            </div>
        </li>
    )
}