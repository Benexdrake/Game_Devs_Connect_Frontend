export type CommentType =
{
    id:number;
    message:string;
    filename:string;
    filePath:string;
    parentId:number;
    ownerId:string;
    deleted:boolean;
}