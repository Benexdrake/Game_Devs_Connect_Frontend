import { useState } from "react";
import FileListItem from "./file_list_item";
import styles from '@/styles/modules/file/file_list.module.css'

export default function FileList(props:any)
{
    const {fileIds} = props

    const [show, setShow] = useState(false)
    
    const onKeyDownHandler = (e:any) =>
    {
        console.log(e);
        
    }

    return (
        <div className={styles.main}>
            {
                show ? (
                    <div>
                        <button className={styles.navbar} onClick={() => setShow((prev:boolean) => !prev)} onKeyDown={onKeyDownHandler}>Close</button>
                    {fileIds.map((id:any) => 
                        (
                            <div style={{padding:'8px'}} key={crypto.randomUUID()}>
                                <FileListItem fileId={id}/>
                            </div>
                        )
                    )}
                    </div>
                )
                :
                (
                    <button className={styles.navbar} onClick={() => setShow((prev:boolean) => !prev)}>Files</button>
                )
            }
            
        </div>
    )
}