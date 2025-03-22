import { APIResponse } from "@/types/api_response";
import { FileType } from "@/types/file";
import axios from "axios";
import { getAxiosConfig } from "../lib/api";
import { AuthType } from "@/types/auth";

// Get FileIds By Owner ID
export const getFileIdsByOwnerId = async (ownerId:string) =>
{
    return await axios.get<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/file/user/${ownerId}`).then(x => x.data)
}

// Get FileIds by Request ID
export const getFilesByRequestId = async (id:string) =>
{   
    return await axios.get<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/file/request/${id}`).then(x => x.data)
}

// Get File by Id
export const getFileById = async (id:string) =>
{
    return await axios.get<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/file/${id}`).then(x => x.data)
}
// Add File
export const addFile = async (file:FileType, token:string) =>
{
    return await axios.post<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/file/add`, file, getAxiosConfig(token)).then(x => x.data)
}

// Update File
export const updateFile = async (file:FileType, token:string) =>
{
    return await axios.put<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/file/update`, file, getAxiosConfig(token)).then(x => x.data)
}

// Delete File
export const deleteFile = async (id:string, token:string) =>
{
    return await axios.delete<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/file/delete/${id}`, getAxiosConfig(token)).then(x => x.data)
}