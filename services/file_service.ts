import { APIResponse } from "@/types/api_response";
import { FileType } from "@/types/file";
import axios from "axios";
import { getUrlHandler } from "../lib/api";

// Get FileIds By Owner ID
export const getFileIdsByOwnerId = async (frontend:boolean, ownerId:string) =>
{
    return await axios.get<APIResponse>(`${getUrlHandler(frontend)}/file/user/${ownerId}`).then(x => x.data)
}

// Get FileIds by Request ID

// Get File by Id
export const getFileById = async (frontend:boolean, id:number) =>
{
    return await axios.get<APIResponse>(`${getUrlHandler(frontend)}/file/${id}`).then(x => x.data)
}
// Add File
export const addFile = async (frontend:boolean, file:FileType) =>
{
    return await axios.post<APIResponse>(`${getUrlHandler(frontend)}/file/`, file).then(x => x.data)
}

// Update File
export const updateFile = async (frontend:boolean, file:FileType) =>
{
    return await axios.put<APIResponse>(`${getUrlHandler(frontend)}/file/`, file).then(x => x.data)
}

// Delete File
export const deleteFile = async (frontend:boolean, id:number) =>
{
    return await axios.delete<APIResponse>(`${getUrlHandler(frontend)}/file/delete/${id}`).then(x => x.data)
}