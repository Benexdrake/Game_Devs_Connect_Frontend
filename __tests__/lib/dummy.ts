import { addRequest, deleteRequest, likedRequest } from "../../services/request_services";
import { addUser, deleteUser } from "../../services/user_services";
import { UserType } from "../../types/user";
import { RequestType } from "@/types/request";
import { RequestTagsType } from "@/types/request_tags";

export const createDummyUser = async (frontend:boolean, userId:string = 'dummy') =>
{
    const user:UserType = {id:userId, avatar:'', accountType:'test', username:'dummy'}        
    await addUser(frontend, user);
}

export const deleteDummyUser = async (frontend:boolean, userId:string = 'dummy') =>
{
    await deleteUser(frontend, userId)
}

export const createDummyRequest = async (frontend:boolean, requestId:number = 9999) =>
{
    const request:RequestType = {id:requestId, title:'test', description:'', fileId:0, created:'', projectId:'', ownerId:'' }
    const requestTags:RequestTagsType = {request, tags:[]}
    await addRequest(frontend, requestTags)
}

export const deleteDummyRequest = async (frontend:boolean, requestId:string = '9999') =>
{
    await deleteRequest(frontend, requestId)
}

export const createDummyLike = async (frontend:boolean, requestId:number = 9999, userId:string= 'dummy') =>
{
    await likedRequest(frontend, requestId,userId, true);
}