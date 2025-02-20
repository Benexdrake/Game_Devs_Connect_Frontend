import { APIResponse } from "@/types/api_response";
import axios from "axios";

const url = process.env.url+'/project/';

export const getProjects = async () =>
{
    return await axios.get<APIResponse>(url).then(x => x.data)
}

export const getProjectById = async (id:string) =>
{
    return await axios.get<APIResponse>(`${url}${id}`).then(x => x.data)
}

export const addProject = async (project:any) =>
{
    return await axios.post<APIResponse>(`${url}add`, project).then(x => x.data)
}

export const updateProject = async (project:any) =>
{
    return await axios.put<APIResponse>(`${url}update`, project).then(x => x.data)
}

export const deleteProject = async (id:string) =>
{
    return await axios.delete<APIResponse>(`${url}delete/${id}`).then(x => x.data)
}