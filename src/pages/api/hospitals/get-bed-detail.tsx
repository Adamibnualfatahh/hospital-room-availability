import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { hospital, type } = req.query
    const response = await axios.get(`https://rs-bed-covid-api.vercel.app/api/get-bed-detail?hospitalid=${hospital}&type=${type}`)
    const data = response.data
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}