import axios from "axios";

const url = process.env.url+'/user/';

export const getUsers = async () =>
{
    return await axios.get(`${url}all`).then(x => x.data)
}

export const getUserById = async (id:string) =>
{
    return await axios.get(`${url}${id}`).then(x => x.data)
}

export const addUser = async (user:any) =>
{
    return await axios.post(`${url}add`, user).then(x => x.data)
}

export const updateUser = async (user:any) =>
{
    return axios.put(`${url}update`, user).then(x => x.data)
}

export const deleteUser = async (userId:string) =>
{
    return axios.delete(`${url}delete/${userId}`).then(x => x.data)
}
