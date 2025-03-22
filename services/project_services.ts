import { APIResponse } from "@/types/api_response";
import axios from "axios";
import { getAxiosConfig } from "../lib/api";
import { AuthType } from "@/types/auth";

export const getProjects = async () =>
{
    return await axios.get<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/`).then(x => x.data)
}

export const getProjectById = async (id:string) =>
{
    return await axios.get<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${id}`).then(x => x.data)
}

export const getProjectIdsByUserId = async (userId:string) =>
{
    return await axios.get<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/user/${userId}`).then(x => x.data)
}

export const addProject = async (project:any, token:string) =>
{
    return await axios.post<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/add`, project, getAxiosConfig(token)).then(x => x.data)
}

export const updateProject = async (project:any, token:string) =>
{
    return await axios.put<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/update`, project, getAxiosConfig(token)).then(x => x.data)
}

export const deleteProject = async (id:string, token:string) =>
{
    return await axios.delete<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/delete/${id}`, getAxiosConfig(token)).then(x => x.data)
}