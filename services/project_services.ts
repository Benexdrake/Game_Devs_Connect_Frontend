import { APIResponse } from "@/types/api_response";
import axios from "axios";
import { getUrlHandler } from "../lib/api";

export const getProjects = async (frontend:boolean=false) =>
{
    return await axios.get<APIResponse>(`${getUrlHandler(frontend)}/project/`).then(x => x.data)
}

export const getProjectById = async (id:string, frontend:boolean=false) =>
{
    return await axios.get<APIResponse>(`${getUrlHandler(frontend)}/project/${id}`).then(x => x.data)
}

export const getProjectIdsByUserId = async (userId:string, frontend:boolean=false) =>
{
    return await axios.get<APIResponse>(`${getUrlHandler(frontend)}/project/user/${userId}`).then(x => x.data)
}

export const addProject = async (project:any, frontend:boolean=false) =>
{
    return await axios.post<APIResponse>(`${getUrlHandler(frontend)}/project/add`, project).then(x => x.data)
}

export const updateProject = async (project:any, frontend:boolean=false) =>
{
    return await axios.put<APIResponse>(`${getUrlHandler(frontend)}/project/update`, project).then(x => x.data)
}

export const deleteProject = async (id:string, frontend:boolean=false) =>
{
    return await axios.delete<APIResponse>(`${getUrlHandler(frontend)}/project/delete/${id}`).then(x => x.data)
}