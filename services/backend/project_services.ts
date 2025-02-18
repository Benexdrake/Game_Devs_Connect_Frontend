import axios from "axios";

const url = process.env.url+'/project/';

export const getProjects = async () =>
{
    return await axios.get(url).then(x => x.data)
}

export const getProjectById = async (id:string) =>
{
    return await axios.get(`${url}${id}`).then(x => x.data)
}

export const addProject = async (project:any) =>
{
    return await axios.post(`${url}add`, project).then(x => x.data)
}

export const updateProject = async (project:any) =>
{
    return await axios.put(`${url}update`, project).then(x => x.data)
}

export const deleteProject = async (id:string) =>
{
    return await axios.delete(`${url}delete/${id}`).then(x => x.data)
}