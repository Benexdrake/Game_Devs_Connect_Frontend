import { APIResponse } from "@/types/api_response";
import { TagType } from "@/types/tag";
import axios from "axios";
import { getUrlHandler } from "../lib/api";

export const getTags = async (frontend:boolean=false) =>
{
    return await axios.get<APIResponse>(`${getUrlHandler(frontend)}/tag/`).then(x => x.data);
}

export const getTagsByRequestId = async (requestId:string, frontend:boolean=false, ) =>
{
    return await axios.get<APIResponse>(`${getUrlHandler(frontend)}/tag/${requestId}`).then(x => x.data);
}

export const addTag = async (tag:TagType, frontend:boolean=false) =>
{
    return await axios.post<APIResponse>(`${getUrlHandler(frontend)}/tag/add`, tag).then(x => x.data);
}

export const updateTag = async (tag:TagType, frontend:boolean=false) =>
{
    return await axios.put<APIResponse>(`${getUrlHandler(frontend)}/tag/update`, tag).then(x => x.data);
}

export const deleteTag = async (tagId:string, frontend:boolean=false) =>
{
    return await axios.delete<APIResponse>(`${getUrlHandler(frontend)}/tag/delete/${tagId}`).then(x => x.data);
}
