import { APIResponse } from "@/types/api_response";
import { CommentType } from "@/types/comment";
import axios from "axios";
import { getUrlHandler } from "../lib/api";

import { getAxiosConfig } from "../lib/api";

export const getCommentIds = async (parentId:string, auth:string ,frontend:boolean = false) =>
{
    return await axios.get<APIResponse>(`${getUrlHandler(frontend)}/comment/${parentId}`, getAxiosConfig('')).then( x => x.data)
}

export const getCommentById = async (id:string, frontend:boolean = false) =>
{
    return await axios.get<APIResponse>(`${getUrlHandler(frontend)}/comment/id/${id}`).then( x => x.data)
}

export const getCommentCount = async (id:string, frontend:boolean = false) =>
{
    return await axios.get<APIResponse>(`${getUrlHandler(frontend)}/comment/count/${id}`).then( x => x.data)
}

export const addComment = async (comment:CommentType, frontend:boolean = false) =>
{
    return await axios.post<APIResponse>(`${getUrlHandler(frontend)}/comment/add`, comment).then( x => x.data)
}

export const updateComment = async (comment:CommentType, frontend:boolean = false) =>
{
    return await axios.put<APIResponse>(`${getUrlHandler(frontend)}/comment/update`, comment).then( x => x.data)
}

export const deleteComment = async (id:string, frontend:boolean = false) =>
{
    return await axios.delete<APIResponse>(`${getUrlHandler(frontend)}/comment/delete/${id}`).then( x => x.data)
}