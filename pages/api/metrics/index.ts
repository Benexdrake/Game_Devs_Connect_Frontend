// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {getMetrics} from '@/lib/metrics'

export default async function handler(req: NextApiRequest, res: NextApiResponse)
{
  
  await getMetrics(req,res);
}
