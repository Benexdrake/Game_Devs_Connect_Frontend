import { APIResponse } from "@/types/api_response";
import { FileType } from "@/types/file";
import axios from "axios";
import { getUrlHandler } from "../lib/api";

// Get FileIds By Owner ID
export const getFileIdsByOwnerId = async (ownerId:string, frontend:boolean=false) =>
{
    return await axios.get<APIResponse>(`${getUrlHandler(frontend)}/file/user/${ownerId}`).then(x => x.data)
}

// Get FileIds by Request ID
export const getFilesByRequestId = async (id:string, frontend:boolean=false) =>
{   
    return await axios.get<APIResponse>(`${getUrlHandler(frontend)}/file/request/${id}`).then(x => x.data)
}

// Get File by Id
export const getFileById = async (id:string, frontend:boolean=false) =>
{
    return await axios.get<APIResponse>(`${getUrlHandler(frontend)}/file/${id}`).then(x => x.data)
}
// Add File
export const addFile = async (file:FileType, frontend:boolean=false) =>
{
    return await axios.post<APIResponse>(`${getUrlHandler(frontend)}/file/add`, file).then(x => x.data)
}

// Update File
export const updateFile = async (file:FileType, frontend:boolean=false) =>
{
    return await axios.put<APIResponse>(`${getUrlHandler(frontend)}/file/update`, file).then(x => x.data)
}

// Delete File
export const deleteFile = async (id:string, frontend:boolean=false) =>
{
    return await axios.delete<APIResponse>(`${getUrlHandler(frontend)}/file/delete/${id}`).then(x => x.data)
}