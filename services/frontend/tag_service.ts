import { APIResponse } from "@/types/api_response";
import { TagType } from "@/types/tag";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_FRONTEND_URL+'/api/tag/';

export const getTags = async () =>
{
    return await axios.get<APIResponse>(url).then(x => x.data);
}

export const getTagsByRequestId = async (requestId:string) =>
{
    return await axios.get<APIResponse>(`${url}${requestId}`).then(x => x.data);
}

export const addTag = async (tag:TagType) =>
{
    return await axios.post<APIResponse>(`${url}add`, tag).then(x => x.data);
}

export const updateTag = async (tag:TagType) =>
{
    return await axios.put<APIResponse>(`${url}update`, tag).then(x => x.data);
}

export const deleteTag = async (tagId:string) =>
{
    return await axios.delete<APIResponse>(`${url}delete/${tagId}`).then(x => x.data);
}
