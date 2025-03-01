import { APIResponse } from "@/types/api_response";
import axios from "axios";

const url = process.env.BACKEND_URL+'/notification/';

// Get Notification By Id / notificationId
export const getNotificationById = async (notificationId:string) =>
{
    return await axios.get<APIResponse>(`${url}${notificationId}`).then(x => x.data)
}

// Get by user id /user/userId
export const getNotificationIds = async (userId:string) =>
{
    return await axios.get<APIResponse>(`${url}user/${userId}`).then(x => x.data)
}

//Get by Unseen as Count / unseen/userId
export const getUnseenNotificationCount = async (userId:string) =>
{
    return await axios.get<APIResponse>(`${url}unseen/${userId}`).then(x => x.data)
}

export const updateSeenNotification = async (notificationId:string) =>
{   
    return await axios.put<APIResponse>(`${url}?notificationId=${notificationId}`).then(x => x.data)
}