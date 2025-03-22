import { APIResponse } from "@/types/api_response";
import { TagType } from "@/types/tag";
import axios from "axios";
import { getAxiosConfig } from "../lib/api";
import { AuthType } from "@/types/auth";

export const getTags = async () =>
{
    return await axios.get<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tag/`).then(x => x.data);
}

export const getTagsByRequestId = async (requestId:string) =>
{
    return await axios.get<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tag/${requestId}`).then(x => x.data);
}

export const addTag = async (tag:TagType, token:string) =>
{
    return await axios.post<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tag/add`, tag, getAxiosConfig(token)).then(x => x.data);
}

export const updateTag = async (tag:TagType, token:string) =>
{
    return await axios.put<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tag/update`, tag, getAxiosConfig(token)).then(x => x.data);
}

export const deleteTag = async (tagId:string, token:string) =>
{
    return await axios.delete<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tag/delete/${tagId}`, getAxiosConfig(token)).then(x => x.data);
}
