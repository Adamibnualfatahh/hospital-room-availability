import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import '@/styles/globals.css'
import Layout from '../layout'

export default function Detail() {
  const router = useRouter()
  const { id, type } = router.query

  const [details, setDetails] = useState<{
    data: {
      long: string | undefined
      lat: string | undefined
      phone: any
      time: string
      id: any
      address: any
      name: any
      bedDetail: any[]
    }
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `/api/hospitals/get-bed-detail?id=${id}&type=${type}`,
        )
        const data = await response.json()
        setDetails(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    if (id && type) {
      fetchDetail()
    }
  }, [id, type])
  const calculateTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return `${diffInSeconds} detik`
    } else if (diffInSeconds < 3600) {
      const diffInMinutes = Math.floor(diffInSeconds / 60)
      return `${diffInMinutes} menit`
    } else if (diffInSeconds < 86400) {
      const diffInHours = Math.floor(diffInSeconds / 3600)
      return `${diffInHours} jam`
    } else {
      const diffInDays = Math.floor(diffInSeconds / 86400)
      return `${diffInDays} hari`
    }
  }

  const formatTimeAgo = (dateTimeString: string) => {
    const [day, month, year, time] = dateTimeString.split(/[- :]/)
    const formattedDateString = `${year}-${month}-${day} ${time}`
    const date = new Date(formattedDateString)

    if (isNaN(date.getTime())) {
      return 'Waktu tidak valid'
    }

    const timeAgo = calculateTimeAgo(date)
    return `Diupdate ${timeAgo} yang lalu`
  }

  if (loading) return <div>Loading...</div>
  if (!details) return <div>No detail found</div>
  return (
    <Layout>
      <main className='flex min-h-screen flex-col items-center justify-between p-10 bg-white'>
        <div className='w-full max-w-3xl'>
          <div className='flex flex-col p-8 border-2 border-black shadow-md hover:shadow-lg relative'>
            <div className='absolute inset-x-0 bottom-0 h-1 bg-black'></div>
            <div className='flex items-center justify-between relative z-10'>
              <div className='flex items-center'>
                <button
                  onClick={() => router.push('/')}
                  className='flex-no-shrink bg-black px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider text-white rounded-full'
                >
                  Kembali Ke Halaman Utama
                </button>
              </div>
              <div className='flex flex-col ml-3'>
                <div className='font-medium leading-none text-black'>
                  Daftar Jenis Tempat Tidur
                </div>
                <p className='text-sm text-black leading-none mt-1'>
                  Tersedia{' '}
                  {details && details.data && details.data.bedDetail
                    ? details.data.bedDetail.length
                    : 0}{' '}
                  jenis tempat tidur
                </p>
              </div>
            </div>
          </div>
          <div className='mt-4 border-2 border-black' key={details.data.id}>
            <div className='w-full bg-gray-900 p-4 text-white'>
              <h1 className='text-2xl font-bold'>{details.data.name}</h1>
              <h2 className='text-xl font-semibold'>{details.data.address}</h2>
            </div>
            <div className='flex justify-between items-center p-4'>
              <div>
                <div className='text-gray-500'>
                  <button
                    type='button'
                    className='w-full h-12 flex items-center justify-center relative px-4 py-2 font-medium group text-black hover:text-white'
                  >
                    <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
                    <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
                    <a
                      href={`tel:${details.data.phone}`}
                      className='relative flex items-center'
                    >
                      <svg
                        className='w-4 h-4 pr-1'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='currentColor'
                        viewBox='0 0 19 18'
                      >
                        <path d='M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z' />
                      </svg>
                      {details.data.phone}
                    </a>
                  </button>
                </div>
              </div>
              <div className='flex items-end'>
                <>
                  <div className='text-gray-500'>
                    <button
                      type='button'
                      className='w-full h-12 flex items-center justify-center relative px-4 py-2 font-medium group text-black hover:text-white'
                    >
                      <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
                      <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${details.data.lat},${details.data.long}`}
                        target='_blank'
                        className='relative flex items-center'
                      >
                        Lokasi
                      </a>
                    </button>
                  </div>
                </>
              </div>
            </div>
            <div className='w-full text-black border-b-2 border-black px-4 pb-2'>
              {details.data?.bedDetail.map((bed: any) => (
                <>
                  <div className='bg-black text-white text-center py-2 mt-2'>
                    {bed.stats.title}
                  </div>
                  <div className='border-2 text-black border-black p-2 '>
                    Jumlah tempat tidur: {bed.stats.bed_available} <br />
                    {bed.stats.bed_empty === 0 ? (
                      <p className='text-red-500'>
                        Tidak ada kamar yang tersedia <br />
                      </p>
                    ) : (
                      <>
                        Tempat tidur kosong: {bed.stats.bed_empty} <br />
                      </>
                    )}
                    Antrian: {bed.stats.queue} <br />
                  </div>
                  <div className='bg-black text-white text-center py-2'>
                    {formatTimeAgo(bed.time)}
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
