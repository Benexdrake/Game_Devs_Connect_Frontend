import axios from "axios";

const url = process.env.url+'/tag/';

export const getTags = async () =>
{
    return await axios.get(url).then(x => x.data)
}