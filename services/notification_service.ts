import { APIResponse } from "@/types/api_response";
import axios from "axios";
import { getAxiosConfig } from "../lib/api";
import { AuthType } from "@/types/auth";

// Get Notification By Id / notificationId
export const getNotificationById = async (notificationId:string) =>
{
    return await axios.get<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notification/${notificationId}`).then(x => x.data)
}

// Get by user id /user/userId
export const getNotificationIds = async (userId:string) =>
{
    return await axios.get<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notification/user/${userId}`).then(x => x.data)
}

export const updateSeenNotification = async (notificationId:string, token:string) =>
{   
    return await axios.put<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notification/seen/${notificationId}`, getAxiosConfig(token)).then(x => x.data)
}

//Get by Unseen as Count / unseen/userId
export const getUnseenNotificationCount = async (userId:string, token:string) =>
{
    return await axios.get<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notification/unseen/${userId}`, getAxiosConfig(token)).then(x => x.data)
}

export const deleteNotificationById = async (notificationId:string, token:string) =>
{
    return await axios.delete<APIResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notification/delete/${notificationId}`, getAxiosConfig(token)).then(x => x.data)
}