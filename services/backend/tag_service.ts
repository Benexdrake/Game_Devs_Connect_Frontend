import { APIResponse } from "@/types/api_response";
import axios from "axios";

const url = process.env.url+'/tag/';

export const getTags = async () =>
{
    return await axios.get<APIResponse>(url).then(x => x.data)
}