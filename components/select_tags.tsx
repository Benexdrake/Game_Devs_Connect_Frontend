import styles from '@/styles/modules/select_tags.module.css'
import { TagType } from '@/types/tag';
import { useState } from 'react'
import Tag from './tag';
export default function SelectTags(props:any)
{
    const [open, setOpen] = useState(false)
    const [tags, setTags] = useState<TagType[]>([])

    const {setTagsHandler} = props;

    const loadedTags:TagType[] = [{name:'2D'}, {name:'Sprites'}, {name:'3D'}, {name:'Animation'}]


    const onSelectOpenTagsClickHandler = () =>
    {
        setOpen(!open);
    }

    const onSelectTagsHandler = (tag:TagType) =>
    {
        const t = tags.find(x => x.name === tag.name);
        if(t)
            setTags(tags.filter(t => t.name !== tag.name))
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
                <ul className={styles.list_items} style={{display:open?'block':'none'}}>
                    {loadedTags.map(tag => <Tag styles={styles} tag={tag} onSelectTagsHandler={onSelectTagsHandler}/>)}
                </ul>
        </>
    )
}