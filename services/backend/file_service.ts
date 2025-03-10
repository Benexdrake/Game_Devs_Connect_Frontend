import { APIResponse } from "@/types/api_response";
import { FileType } from "@/types/file";
import axios from "axios";

const url = process.env.BACKEND_URL+'/file/';

// Get FileIds By Owner ID
export const getFileIdsByOwnerId = async (ownerId:string) =>
{
    return await axios.get<APIResponse>(`${url}user/${ownerId}`).then(x => x.data)
}

// Get FileIds by Request ID

// Get File by Id
export const getFileById = async (id:number) =>
{
    return await axios.get<APIResponse>(`${url}${id}`).then(x => x.data)
}
// Add File
export const addFile = async (file:FileType) =>
{
    return await axios.post<APIResponse>(`${url}`, file).then(x => x.data)
}

// Update File
export const updateFile = async (file:FileType) =>
{
    return await axios.put<APIResponse>(`${url}`, file).then(x => x.data)
}

// Delete File
export const deleteFile = async (id:number) =>
{
    return await axios.delete<APIResponse>(`${url}delete/${id}`).then(x => x.data)
}