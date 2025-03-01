import { APIResponse } from "@/types/api_response";
import axios from "axios";

const url = process.env.BACKEND_URL+'/tag/';

export const getTags = async () =>
{
    return await axios.get<APIResponse>(url).then(x => x.data)
}

export const getTagsByRequestId = async (requestId:string) =>
{
    return await axios.get<APIResponse>(`${url}${requestId}`).then(x => x.data)
}