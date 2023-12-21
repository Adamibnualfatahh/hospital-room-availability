import { NextApiRequest, NextApiResponse } from 'next'
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const provincesData = {
    provinces: [
      { id: '11prop', name: 'Aceh' },
      { id: '12prop', name: 'Sumatera Utara' },
      { id: '13prop', name: 'Sumatera Barat' },
      { id: '14prop', name: 'Riau' },
      { id: '15prop', name: 'Jambi' },
      { id: '16prop', name: 'Sumatera Selatan' },
      { id: '17prop', name: 'Bengkulu' },
      { id: '18prop', name: 'Lampung' },
      { id: '19prop', name: 'Kepulauan Bangka Belitung' },
      { id: '20prop', name: 'Kepulauan Riau' },
      { id: '31prop', name: 'DKI Jakarta' },
      { id: '32prop', name: 'Jawa Barat' },
      { id: '33prop', name: 'Jawa Tengah' },
      { id: '34prop', name: 'DI Yogyakarta' },
      { id: '35prop', name: 'Jawa Timur' },
      { id: '36prop', name: 'Banten' },
      { id: '51prop', name: 'Bali' },
      { id: '52prop', name: 'Nusa Tenggara Barat' },
      { id: '53prop', name: 'Nusa Tenggara Timur' },
      { id: '61prop', name: 'Kalimantan Barat' },
      { id: '62prop', name: 'Kalimantan Tengah' },
      { id: '63prop', name: 'Kalimantan Selatan' },
      { id: '64prop', name: 'Kalimantan Timur' },
      { id: '65prop', name: 'Kalimantan Utara' },
      { id: '71prop', name: 'Sulawesi Utara' },
      { id: '72prop', name: 'Sulawesi Tengah' },
      { id: '73prop', name: 'Sulawesi Selatan' },
      { id: '74prop', name: 'Sulawesi Tenggara' },
      { id: '75prop', name: 'Gorontalo' },
      { id: '76prop', name: 'Sulawesi Barat' },
      { id: '81prop', name: 'Maluku' },
      { id: '82prop', name: 'Maluku Utara' },
      { id: '91prop', name: 'Papua Barat' },
      { id: '92prop', name: 'Papua' },
    ],
  }

  try {
    res.status(200).json(provincesData)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
