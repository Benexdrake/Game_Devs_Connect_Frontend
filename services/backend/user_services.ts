import { APIResponse } from "@/types/api_response";
import axios from "axios";

const url = process.env.BACKEND_URL+'/user/';

export const getUsers = async () =>
{
    return await axios.get<APIResponse>(`${url}`).then(x => x.data)
}

export const getUserById = async (id:string) =>
{
    return await axios.get<APIResponse>(`${url}${id}`).then(x => x.data)
}

export const getShortUserById = async (id:string) =>
{
    return await axios.get<APIResponse>(`${url}short/${id}`).then(x => x.data)
}

export const addUser = async (user:any) =>
{
    return await axios.post<APIResponse>(`${url}add`, user).then(x => x.data)
}

export const updateUser = async (user:any) =>
{
    return axios.put<APIResponse>(`${url}update`, user).then(x => x.data)
}

export const deleteUser = async (userId:string) =>
{
    return axios.delete<APIResponse>(`${url}delete/${userId}`).then(x => x.data)
}
