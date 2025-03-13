import { APIResponse } from "@/types/api_response";
import { RequestType } from "@/types/request";
import { RequestTagsType } from "@/types/request_tags";
import axios from "axios";
import { getUrlHandler } from "../lib/api";

export const getRequests = async (frontend:boolean= false) =>
{
    return await axios.get<APIResponse>(`${getUrlHandler(frontend)}/request/`).then(x => x.data)
}

export const getRequestById = async (id:string, frontend:boolean=false) =>
{
    return await axios.get<APIResponse>(`${getUrlHandler(frontend)}/request/${id}`).then(x => x.data)
}

export const getRequestsByUserId = async (userId:string, frontend:boolean=false) =>
{
    return await axios.get<APIResponse>(`${getUrlHandler(frontend)}/request/user/${userId}`).then(x => x.data)
}

export const getFullRequestById = async (id:string, userId:string, frontend:boolean=false) =>
{
    return await axios.get<APIResponse>(`${getUrlHandler(frontend)}/request/full/${id}?userId=${userId}`).then(x => x.data)
}

export const getRequestCheck = async (id:string, frontend:boolean=false) =>
{
    return await axios.get<APIResponse>(`${getUrlHandler(frontend)}/request/check/${id}`).then(x => x.data)
}

export const getFilesByRequestId = async (id:string, frontend:boolean=false) =>
{   
    return await axios.get<APIResponse>(`${getUrlHandler(frontend)}/request/files/${id}`).then(x => x.data)
}

export const addRequest = async (request:RequestTagsType, frontend:boolean=false) =>
{   
    return await axios.post<APIResponse>(`${getUrlHandler(frontend)}/request/add`, request).then(x => x.data)
}

export const updateRequest = async (request:RequestType, frontend:boolean=false) =>
{
    return await axios.put<APIResponse>(`${getUrlHandler(frontend)}/request/update`,request).then(x => x.data)
}

export const likedRequest = async (requestId:number, userId:string, liked:boolean, frontend:boolean=false) =>
{   
    return await axios.post<APIResponse>(`${getUrlHandler(frontend)}/request/liked?requestId=${requestId}&userId=${userId}&liked=${liked}`,).then(x => x.data)
}

export const deleteRequest = async (id:string, frontend:boolean=false) =>
{
    return await axios.delete<APIResponse>(`${getUrlHandler(frontend)}/request/delete/${id}`).then(x => x.data)
}