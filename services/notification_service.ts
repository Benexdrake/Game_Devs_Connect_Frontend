import { APIResponse } from "@/types/api_response";
import axios from "axios";
import { getUrlHandler } from "../lib/api";

// Get Notification By Id / notificationId
export const getNotificationById = async (notificationId:string, frontend:boolean=false) =>
{
    return await axios.get<APIResponse>(`${getUrlHandler(frontend)}/notification/${notificationId}`).then(x => x.data)
}

// Get by user id /user/userId
export const getNotificationIds = async (userId:string, frontend:boolean=false) =>
{
    return await axios.get<APIResponse>(`${getUrlHandler(frontend)}/notification/user/${userId}`).then(x => x.data)
}

//Get by Unseen as Count / unseen/userId
export const getUnseenNotificationCount = async (userId:string, frontend:boolean=false) =>
{
    return await axios.get<APIResponse>(`${getUrlHandler(frontend)}/notification/unseen/${userId}`).then(x => x.data)
}

export const deleteNotificationById = async (notificationId:string, frontend:boolean=false) =>
{
    return await axios.delete<APIResponse>(`${getUrlHandler(frontend)}/notification/delete/${notificationId}`).then(x => x.data)
}