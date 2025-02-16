import styles from '@/styles/modules/select_tags.module.css'
import { TagType } from '@/types/tag';
import { useEffect, useState } from 'react'
import Tag from './tag';
import axios from 'axios';

export default function SelectTags(props:any)
{
    

    const [open, setOpen] = useState(false)
    const [tags, setTags] = useState<TagType[]>([])

    const [loadedTags, setLoadedTags] = useState<TagType[]>([])

    const {setTagsHandler} = props;

    useEffect(() =>
    {
        const getTags = async () =>
        {
            const t = await axios.get('http://localhost:3000/api/tag').then(x => x.data.data)
            
            setLoadedTags(t);
        }

        getTags();

    },[])


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
                {loadedTags && loadedTags.map((tag:TagType) => <Tag styles={styles} tag={tag} onSelectTagsHandler={onSelectTagsHandler}/>)}
            </ul>
        </>
    )
}