import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import '@/styles/globals.css'
import Layout from '../layout'
export default function HospitalList() {
  const router = useRouter()
  const { prov, city, covid } = router.query

  const [hospitals, setHospitals] = useState([])
  const [loadingHospitals, setLoadingHospitals] = useState(false)

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoadingHospitals(true)
        const response = await fetch(
          `/api/hospitals/get-hospitals?prov=${prov}&city=${city}&type=${covid}`,
        )
        const data = await response.json()
        setHospitals(data.hospitals)
        setLoadingHospitals(false)
      } catch (error) {
        setLoadingHospitals(false)
      }
    }

    if (prov && city && covid) {
      fetchHospitals()
    }
  }, [prov, city, covid])

  if (loadingHospitals) return <div>Loading...</div>
  if (!hospitals) return <div>No hospitals found</div>

  return (
    <Layout>
      <main className='flex min-h-screen flex-col items-center justify-between p-4 sm:p-10 bg-white'>
        <div className='w-full max-w-3xl'>
          <div className='flex flex-col p-4 sm:p-8 border-2 border-black shadow-md hover:shadow-lg relative'>
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
                  Daftar Rumah Sakit
                </div>
                <p className='text-sm text-black leading-none mt-1'>
                  Tersedia {hospitals?.length} rumah sakit
                </p>
              </div>
            </div>
          </div>

          {hospitals?.length === 0 && (
            <div className='mt-4 border-2 border-black'>
              <div className='w-full bg-gray-900 p-4 text-white'>
                <h1 className='text-2xl font-bold'>Tidak ada hasil</h1>
              </div>
            </div>
          )}

          {hospitals?.map((hospital: any) => (
            <div className='mt-4 border-2 border-black' key={hospital.id}>
              <div className='w-full bg-gray-900 p-4 text-white'>
                <h1 className='text-2xl font-bold'>{hospital.name}</h1>
                <h2 className='text-xl font-semibold'>{hospital.address}</h2>
              </div>

              <div className='w-full text-black border-b-2 border-black p-4'>
                <p className='text-gray-500'>
                  {Number(covid) === 1 && (
                    <>
                      {hospital.bed_availability === 0 ? (
                        <>
                          <span className='text-red-500'>
                            Tidak ada kamar yang tersedia
                          </span>
                          <br />
                        </>
                      ) : (
                        <>
                          Jumlah kamar yang tersedia:{' '}
                          {hospital.bed_availability}
                          <br />
                        </>
                      )}
                    </>
                  )}

                  {Number(covid) !== 1 && (
                    <>
                      Tersedia {hospital.available_beds?.length} jenis kamar
                      {hospital.available_beds?.map((bed: any) => (
                        <>
                          <div className='bg-black text-white text-center py-2 mt-2'>
                            {bed.room_name}
                          </div>
                          <div className='border-2 text-black border-black p-2 '>
                            Tipe Kelas: {bed.bed_class} <br />
                            {bed.available === 0 ? (
                              <>
                                <span className='text-red-500'>
                                  Tidak ada kamar yang tersedia
                                </span>
                                <br />
                              </>
                            ) : (
                              <>
                                Jumlah kamar yang tersedia: {bed.available}
                                <br />
                              </>
                            )}
                          </div>
                          <div className='bg-black text-white text-center py-2'>
                            {bed.info}
                          </div>
                        </>
                      ))}
                    </>
                  )}
                </p>
              </div>

              <div className='flex justify-between items-center p-4'>
                <div>
                  {hospital.phone && (
                    <>
                      <div className='text-gray-500'>
                        <button
                          type='button'
                          className='w-full h-12 flex items-center justify-center relative px-4 py-2 font-medium group text-black hover:text-white'
                        >
                          <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
                          <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
                          <a
                            href={`tel:${hospital.phone}`}
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
                            {hospital.phone}
                          </a>
                        </button>
                      </div>
                    </>
                  )}
                </div>
                <div className='flex items-end'>
                  {Number(covid) == 1 && (
                    <>
                      <div className='text-gray-500'>
                        <button
                          type='button'
                          className='w-full h-12 flex items-center justify-center relative px-4 py-2 font-medium group text-black hover:text-white'
                        >
                          <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
                          <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${hospital.id}`}
                            target='_blank'
                            className='relative flex items-center'
                          >
                            Lokasi
                          </a>
                        </button>
                      </div>
                    </>
                  )}
                  <div className='text-sm text-gray-500 ml-4'>
                    {Number(covid) !== 1 && (
                      <>
                        <a
                          href={`/hospitals/detail?id=${hospital.id}&type=2`}
                          target='_blank'
                          className='w-full h-12 flex items-center justify-center relative px-4 py-2 font-medium group text-black hover:text-white'
                        >
                          <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
                          <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
                          <span className='relative flex items-center'>
                            Detail
                          </span>
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {Number(covid) == 1 && (
                <>
                  <div className='w-full px-4 py-2 bg-black text-center text-white'>
                    <h1>{hospital.info}</h1>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </main>
    </Layout>
  )
}
