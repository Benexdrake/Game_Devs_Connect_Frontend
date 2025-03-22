import { APIResponse } from "@/types/api_response";
import { RequestType } from "@/types/request";
import { RequestTagsType } from "@/types/request_tags";
import axios from "axios";
import { getAxiosConfig } from "../lib/api";
import { AuthType } from "@/types/auth";

export const getRequests = async () =>
{
    return await axios.get<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/request/`).then(x => x.data)
}

export const getRequestById = async (id:string) =>
{
    return await axios.get<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/request/${id}`).then(x => x.data)
}

export const getRequestsByUserId = async (userId:string) =>
{
    return await axios.get<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/request/user/${userId}`).then(x => x.data)
}

export const getFullRequestById = async (id:string, userId:string) =>
{
    return await axios.get<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/request/full/${id}?userId=${userId}`).then(x => x.data)
}

export const getRequestCheck = async (id:string) =>
{
    return await axios.get<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/request/check/${id}`).then(x => x.data)
}

export const addRequest = async (request:RequestTagsType, token:string) =>
{   
    return await axios.post<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/request/add`, request, getAxiosConfig(token)).then(x => x.data)
}

export const updateRequest = async (request:RequestType, token:string) =>
{
    return await axios.put<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/request/update`,request, getAxiosConfig(token)).then(x => x.data)
}

export const likedRequest = async (requestId:string, userId:string, liked:boolean, token:string) =>
{   
    return await axios.post<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/request/liked?requestId=${requestId}&userId=${userId}&liked=${liked}`, getAxiosConfig(token)).then(x => x.data)
}

export const deleteRequest = async (id:string, token:string) =>
{
    return await axios.delete<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/request/delete/${id}`, getAxiosConfig(token)).then(x => x.data)
}