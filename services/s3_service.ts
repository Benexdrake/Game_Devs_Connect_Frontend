import { APIResponse } from "@/types/api_response";
import axios from "axios";
import { getUrlHandler } from "../lib/api";

// Get File by Id
export const getFileByIdFromS3 = async (id:string) =>
{
    return await axios.get<APIResponse>(`/asw/s3/${id}`).then(x => x.data)
}
// Add File
export const addFileToS3 = async (file:FormData, id:string, token:string) =>
{   
    return await axios.post<APIResponse>(`/aws/s3/add?id=${id}`, file, {headers: { 'Content-Type': 'multipart/form-data' }}).then(x => x.data)
}

// Update File
export const updateFileToS3 = async (file:FormData, token:string) =>
{
    return await axios.put<APIResponse>(`/aws/s3/update`, file, {headers: { 'Content-Type': 'multipart/form-data' }}).then(x => x.data)
}

// Delete File
export const deleteFileFromS3 = async (id:string, token:string) =>
{
    return await axios.delete<APIResponse>(`/aws/s3/delete/${id}`).then(x => x.data)
}