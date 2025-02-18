import { CommentType } from "@/types/comment";
import axios from "axios";

const url = process.env.url+'/comment/';

export const getCommentIds = async (parentId:number) =>
{
    return await axios.get(`${url}${parentId}`).then( x => x.data)
}

export const getComment = async (id:number) =>
{
    return await axios.get(`${url}id/${id}`).then( x => x.data)
}

export const addComment = async (comment:CommentType) =>
{
    return await axios.post(`${url}add`, comment).then( x => x.data)
}

export const updateComment = async (comment:CommentType) =>
{
    return await axios.put(`${url}update`, comment).then( x => x.data)
}

export const deleteComment = async (id:number) =>
{
    return await axios.delete(`${url}delete/${id}`).then( x => x.data)
}