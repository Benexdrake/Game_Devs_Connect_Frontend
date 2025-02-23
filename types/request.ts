import { TagType } from "./tag";
import { UserShortType } from "./user";

export type RequestType =
{
    id:number;
    title:string;
    description:string;
    fileId:number;
    created:string;
    projectId:string;
    ownerId:string;
}

export type RequestBlockType =
{
    request:RequestType;
    tags:TagType[];
    user:UserShortType;
    count:number
    likes:number;
}