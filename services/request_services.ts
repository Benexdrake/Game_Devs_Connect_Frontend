import { RequestType } from "@/types/request";
import { RequestTagsType } from "@/types/request_tags";
import axios from "axios";

const url = process.env.url+'/request/';

export const getRequests = async () =>
{
    return await axios.get(`${url}all`).then(x => x.data)
}

export const getRequestById = async (id:string) =>
{
    return await axios.get(`${url}${id}`).then(x => x.data)
}

export const addRequest = async (request:RequestTagsType) =>
{   
    console.log(request);
    
    return await axios.post(`${url}add`, request).then(x => x.data)
}

export const updateRequest = async (request:RequestType) =>
{
    return await axios.put(`${url}update`,request).then(x => x.data)
}

export const deleteRequest = async (id:string) =>
{
    return await axios.delete(`${url}delete/${id}`).then(x => x.data)
}