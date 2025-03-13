import { getUrlHandler } from "../lib/api";
import { APIResponse } from "../types/api_response";
import { UserType } from "../types/user";
import axios from "axios";


export const getUsers = async (frontend:boolean= false) =>
{
    console.log(`${getUrlHandler(frontend)}/user/`);
    
    return await axios.get<APIResponse>(`${getUrlHandler(frontend)}/user/`).then(x => x.data)
}

export const getUserById = async (id:string,frontend:boolean= false) =>
{
    return await axios.get<APIResponse>(`${getUrlHandler(frontend)}/user/${id}`).then(x => x.data)
}

export const addUser = async (user:UserType, frontend:boolean= false) =>
{
    return await axios.post<APIResponse>(`${getUrlHandler(frontend)}/user/add`, user).then(x => x.data)
}

export const updateUser = async (user:UserType, frontend:boolean= false) =>
{
    return axios.put<APIResponse>(`${getUrlHandler(frontend)}/user/update`, user).then(x => x.data)
}

export const deleteUser = async (userId:string, frontend:boolean= false) =>
{
    return axios.delete<APIResponse>(`${getUrlHandler(frontend)}/user/delete/${userId}`).then(x => x.data)
}


