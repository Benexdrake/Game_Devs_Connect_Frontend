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
                        <div className={styles.navbar} onClick={() => setShow((prev:boolean) => !prev)} onKeyDown={onKeyDownHandler}>Close</div>
                    {fileIds.map((id:any) => 
                        (
                            <div style={{padding:'8px'}} key={new Date().toLocaleDateString()}>
                                <FileListItem fileId={id}/>
                            </div>
                        )
                    )}
                    </div>
                )
                :
                (
                    <div className={styles.navbar} onClick={() => setShow((prev:boolean) => !prev)}>Files</div>
                )
            }
            
        </div>
    )
}