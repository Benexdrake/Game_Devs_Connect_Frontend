import { APIResponse } from "@/types/api_response";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_FRONTEND_URL+'/api/notification/';

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

export const deleteNotificationById = async (notificationId:string) =>
{
    return await axios.delete<APIResponse>(`${url}delete/${notificationId}`).then(x => x.data)
}