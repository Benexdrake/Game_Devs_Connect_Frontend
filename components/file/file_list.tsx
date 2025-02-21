import { useState } from "react";
import FileListItem from "./file_list_item";
import styles from '@/styles/modules/file/file_list.module.css'

export default function FileList(props:any)
{
    const {fileIds} = props

    const [show, setShow] = useState(false)
    
    

    return (
        <div className={styles.main}>
            {
                show ? (
                    <div>
                        <div className={styles.navbar} onClick={() => setShow((prev:boolean) => !prev)}>
                            Close
                        </div>
                    {fileIds.map((id:any) => 
                        (
                            <div style={{padding:'8px'}}>
                                <FileListItem fileId={id} />
                            </div>
                        )
                    )}
                    </div>
                )
                :
                (
                    <div className={styles.navbar} onClick={() => setShow((prev:boolean) => !prev)}>
                        Files
                    </div>
                )
            }
            
        </div>
    )
}