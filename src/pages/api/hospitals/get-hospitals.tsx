import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { prov, city, type } = req.query
    const response = await axios.get(
      `${process.env.RS_ENDPOINT}/api/get-hospitals?provinceid=${prov}&cityid=${city}&type=${type}`,
    )
    const data = response.data
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
