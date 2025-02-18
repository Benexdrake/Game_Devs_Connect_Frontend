export type CommentType =
{
    id:number;
    message:string;
    fileid:number;
    parentId:number;
    ownerId:string;
    created:string;
    deleted:boolean;
}