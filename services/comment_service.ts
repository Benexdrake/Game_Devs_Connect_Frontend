import { APIResponse } from "@/types/api_response";
import { CommentType } from "@/types/comment";
import axios from "axios";
import { getAxiosConfig } from "../lib/api";
import { AuthType } from "@/types/auth";

export const getCommentIds = async (parentId:string) =>
{
    return await axios.get<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/comment/${parentId}`).then( x => x.data)
}

export const getCommentById = async (id:string) =>
{
    return await axios.get<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/comment/id/${id}`).then( x => x.data)
}

export const getCommentCount = async (id:string) =>
{
    return await axios.get<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/comment/count/${id}`).then( x => x.data)
}

export const addComment = async (comment:CommentType, token:string) =>
{
    return await axios.post<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/comment/add`, comment, getAxiosConfig(token)).then( x => x.data)
}

export const updateComment = async (comment:CommentType, token:string) =>
{
    return await axios.put<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/comment/update`, comment, getAxiosConfig(token)).then( x => x.data)
}

export const deleteComment = async (id:string, token:string) =>
{
    return await axios.delete<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/comment/delete/${id}`, getAxiosConfig(token)).then( x => x.data)
}