import { addRequest, deleteRequest, likedRequest } from "../../services/request_services";
import { addUser, deleteUser } from "../../services/user_services";
import { UserType } from "../../types/user";
import { RequestType } from "@/types/request";
import { RequestTagsType } from "@/types/request_tags";

export const createDummyUser = async (frontend:boolean, userId:string) =>
{
    const user:UserType = {id:userId, avatar:'', accountType:'test', username:'dummy'}        
    await addUser(user, frontend);
}

export const deleteDummyUser = async (frontend:boolean, userId:string) =>
{
    await deleteUser(userId, frontend)
}

export const createDummyRequest = async (frontend:boolean, requestId:number) =>
{
    const request:RequestType = {id:requestId, title:'test', description:'', fileId:0, created:'', projectId:'', ownerId:'' }
    const requestTags:RequestTagsType = {request, tags:[]}
    await addRequest(requestTags, frontend)
}

export const deleteDummyRequest = async (frontend:boolean, requestId:number) =>
{
    await deleteRequest(requestId+'', frontend)
}

export const createDummyLike = async (frontend:boolean, requestId:number, userId:string) =>
{
    await likedRequest(requestId+'',userId, true, frontend);
}