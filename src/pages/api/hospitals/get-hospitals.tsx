// https://rs-bed-covid-api.vercel.app/api/get-hospitals?provinceid=51prop&cityid=5171&type=1

import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { prov, city, type } = req.query
    const response = await axios.get(`https://rs-bed-covid-api.vercel.app/api/get-hospitals?provinceid=${prov}&cityid=${city}&type=${type}`)
    const data = response.data
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}