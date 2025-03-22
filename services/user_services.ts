import { getAxiosConfig } from "../lib/api";
import { APIResponse } from "../types/api_response";
import { UserType } from "../types/user";
import axios from "axios";


export const getUsers = async () =>
{   
    return await axios.get<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/`).then(x => x.data)
}

export const getUserById = async (id:string) =>
{
    return await axios.get<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${id}`).then(x => x.data)
}

export const addUser = async (user:UserType, token:string) =>
{
    return await axios.post<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/add`, user, getAxiosConfig(token)).then(x => x.data)
}

export const updateUser = async (user:UserType, token:string) =>
{
    return axios.put<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/update`, user, getAxiosConfig(token)).then(x => x.data)
}

export const deleteUser = async (userId:string, token:string) =>
{
    return axios.delete<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/delete/${userId}`, getAxiosConfig(token)).then(x => x.data)
}


