import { addRequest, deleteRequest, likedRequest } from "../../services/backend/request_services";
import { addUser, deleteUser } from "../../services/backend/user_services";
import { UserType } from "../../types/user";
import { RequestType } from "@/types/request";
import { RequestTagsType } from "@/types/request_tags";

export const createDummyUser = async (userId:string = 'dummy') =>
{
    const user:UserType = {id:userId, avatar:'', accountType:'test', username:'dummy'}        
    await addUser(user);
}

export const deleteDummyUser = async (userId:string = 'dummy') =>
{
    await deleteUser(userId)
}

export const createDummyRequest = async (requestId:number = 9999) =>
{
    const request:RequestType = {id:requestId, title:'test', description:'', fileId:0, created:'', projectId:'', ownerId:'' }
    const requestTags:RequestTagsType = {request, tags:[]}
    await addRequest(requestTags)
}

export const deleteDummyRequest = async (requestId:string = '9999') =>
{
    await deleteRequest(requestId)
}

export const createDummyLike = async (requestId:number = 9999, userId:string= 'dummy') =>
{
    await likedRequest(requestId,userId, true);
}