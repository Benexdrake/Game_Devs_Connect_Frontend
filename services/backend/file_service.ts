import { FileType } from "@/types/file";
import axios from "axios";

const url = process.env.url+'/file/';

// Get FileIds By Owner ID
export const getFileIdsByOwnerId = async (ownerId:string) =>
{
    return await axios.get(`${url}user/${ownerId}`).then(x => x.data)
}

// Get File by Id
export const getFileById = async (id:number) =>
{
    return await axios.get(`${url}${id}`).then(x => x.data)
}
// Add File
export const addFile = async (file:FileType) =>
{
    return await axios.post(`${url}`, file).then(x => x.data)
}

// Update File
export const updateFile = async (file:FileType) =>
{
    return await axios.put(`${url}`, file).then(x => x.data)
}

// Delete File
export const deleteFile = async (id:number) =>
{
    return await axios.delete(`${url}${id}`).then(x => x.data)
}