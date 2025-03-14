import { APIResponse } from "@/types/api_response";
import axios from "axios";
import { getUrlHandler } from "../lib/api";

// Get File by Id
export const getFileByIdFromS3 = async (id:string, frontend:boolean=false) =>
{
    return await axios.get<APIResponse>(`${getUrlHandler(frontend)}/asw/s3/${id}`).then(x => x.data)
}
// Add File
export const addFileToS3 = async (file:FormData, id:string, frontend:boolean=false) =>
{   
    return await axios.post<APIResponse>(`${getUrlHandler(frontend)}/aws/s3/add?id=${id}`, file, {headers: { 'Content-Type': 'multipart/form-data' }}).then(x => x.data)
}

// Update File
export const updateFileToS3 = async (file:FormData, frontend:boolean=false) =>
{
    return await axios.put<APIResponse>(`${getUrlHandler(frontend)}/aws/s3/update`, file, {headers: { 'Content-Type': 'multipart/form-data' }}).then(x => x.data)
}

// Delete File
export const deleteFileFromS3 = async (id:string, frontend:boolean=false) =>
{
    return await axios.delete<APIResponse>(`${getUrlHandler(frontend)}/aws/s3/delete/${id}`).then(x => x.data)
}