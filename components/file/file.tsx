import styles from '@/styles/modules/file/file.module.css'

export default function File(props:any)
{
    const {file} = props;

    return (
        <div>
            <a className={styles.link} href={`https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${file.id}/${file.name}`}>
                <div className={styles.download}>Download | {(file.size / 1024 / 1024).toFixed(2)}MB</div>
            </a>
        </div>
    )
}