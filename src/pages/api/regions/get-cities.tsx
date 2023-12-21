import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { prov } = req.query
    const response = await axios.get(
      `${process.env.RS_ENDPOINT}/api/get-cities?provinceid=${prov}`,
    )
    const data = response.data
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
