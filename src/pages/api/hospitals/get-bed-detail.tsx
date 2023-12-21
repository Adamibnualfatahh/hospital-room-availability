import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { id, type } = req.query
    const bedDetailResponse = await axios.get(
      `${process.env.RS_ENDPOINT}/api/get-bed-detail?hospitalid=${id}&type=${type}`,
    )
    const bedDetailData = bedDetailResponse.data
    const mapResponse = await axios.get(
      `${process.env.RS_ENDPOINT}/api/get-hospital-map?hospitalid=${id}`,
    )

    const mapData = mapResponse.data

    bedDetailData.data.lat = mapData.data.lat || null
    bedDetailData.data.long = mapData.data.long || null

    res.status(200).json(bedDetailData)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
