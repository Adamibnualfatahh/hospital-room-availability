'use client'
import { SetStateAction, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import '@/styles/globals.css'

export default function Search() {
  interface City {
    id: string
    name: string
  }
  interface Province {
    id: string
    name: string
  }
  const [provinces, setProvinces] = useState([])
  const [cities, setCities] = useState([])
  const [filteredProvinces, setFilteredProvinces] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [loadingProvinces, setLoadingProvinces] = useState(true)
  const [loadingCities, setLoadingCities] = useState(false)
  const [isCovidActive, setIsCovidActive] = useState(false)
  const [isNonCovidActive, setIsNonCovidActive] = useState(false)
  const router = useRouter()
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch('/api/regions/get-provinces')
        const data = await response.json()
        setProvinces(data.provinces)
        setFilteredProvinces(data.provinces)
        setLoadingProvinces(false)
      } catch (error) {
        setLoadingProvinces(false)
      }
    }

    fetchProvinces()
  }, [])

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedProvince) {
        setLoadingCities(true)
        try {
          const response = await fetch(
            `/api/regions/get-cities?prov=${selectedProvince}`,
          )
          const data = await response.json()
          setCities(data.cities)
          setLoadingCities(false)
        } catch (error) {
          setLoadingCities(false)
        }
      }
    }

    fetchCities()
  }, [selectedProvince])

  const handleSelectProvinceChange = (e: {
    target: { value: SetStateAction<string> }
  }) => {
    setSelectedProvince(e.target.value)
    setSelectedCity('')
  }

  const handleSelectCityChange = (e: {
    target: { value: SetStateAction<string> }
  }) => {
    setSelectedCity(e.target.value)
  }

  const handleCovidClick = () => {
    setIsCovidActive(!isCovidActive)
    setIsNonCovidActive(false)
  }

  const handleNonCovidClick = () => {
    setIsNonCovidActive(!isNonCovidActive)
    setIsCovidActive(false)
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    router.push(
      `/hospitals?prov=${selectedProvince}&city=${selectedCity}&covid=${
        isCovidActive ? 1 : 2
      }`,
    )
  }
  return (
    <form className='space-y-6' onSubmit={handleSubmit}>
      <h5 className='text-2xl font-bold text-gray-900 dark:text-white text-center'>
        Cek Ketersediaan Kamar
      </h5>
      <label htmlFor='province_select' className='sr-only'>
        Province select
      </label>
      <select
        id='province_select'
        value={selectedProvince}
        onChange={handleSelectProvinceChange}
        disabled={loadingProvinces}
        className='block py-2.5 px-0 w-full text-black bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 text-md'
      >
        <option value='' disabled>
          {loadingProvinces ? 'Loading Provinsi...' : 'Pilih Provinsi'}
        </option>
        {filteredProvinces.map((province: Province) => (
          <option key={province.id} value={province.id}>
            {province.name}
          </option>
        ))}
      </select>

      <label htmlFor='city_select' className='sr-only'>
        City select
      </label>
      <select
        id='city_select'
        value={selectedCity}
        onChange={handleSelectCityChange}
        disabled={loadingCities || !selectedProvince}
        className='block py-2.5 px-0 w-full text-md text-black bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200'
      >
        <option value='' disabled>
          {loadingCities ? 'Loading Kabupaten/Kota...' : 'Pilih Kabupaten/Kota'}
        </option>
        {cities.map((city: City) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>

      <div className='mt-6 space-y-4 xl:mt-12'>
        <div
          className={`flex items-center justify-between w-full px-8 py-3 mx-auto border cursor-pointer ${
            isCovidActive ? 'border-black border-2' : 'border-gray-500'
          }`}
          onClick={handleCovidClick}
        >
          <div className='flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className={`w-5 h-5x ${
                isCovidActive ? 'text-black' : 'text-gray-500'
              }`}
              onClick={handleCovidClick}
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                clipRule='evenodd'
              />
            </svg>
            <div className='flex flex-col pl-2 space-y-1'>
              <h2
                className={`text-lg font-medium sm:text-2xl ${
                  isCovidActive ? 'text-black' : 'text-gray-500'
                }`}
              >
                Covid19
              </h2>
              <span
                className={`text-sm ${
                  isCovidActive ? 'text-black' : 'text-gray-500'
                }`}
              >
                Kamar untuk pasien covid19
              </span>
            </div>
          </div>
        </div>
        <div
          className={`flex items-center justify-between w-full px-8 py-3 mx-auto border cursor-pointer ${
            isNonCovidActive ? 'border-black border-2' : 'border-gray-500'
          }`}
          onClick={handleNonCovidClick}
        >
          <div className='flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className={`w-5 h-5x ${
                isNonCovidActive ? 'text-black' : 'text-gray-500'
              }`}
              onClick={handleCovidClick}
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                clipRule='evenodd'
              />
            </svg>
            <div className='flex flex-col pl-2 space-y-1'>
              <h2
                className={`text-lg font-medium sm:text-2xl ${
                  isNonCovidActive ? 'text-black' : 'text-gray-500'
                }`}
              >
                Non Covid19
              </h2>
              <span
                className={`text-sm ${
                  isNonCovidActive ? 'text-black' : 'text-gray-500'
                }`}
              >
                Kamar untuk pasien non covid19
              </span>
            </div>
          </div>
        </div>
      </div>
      <button
        type='button'
        onClick={handleSubmit}
        className={`w-full h-12 flex items-center justify-center relative px-4 py-2 font-medium group text-black hover:text-white 
        ${
          loadingProvinces ||
          loadingCities ||
          !selectedProvince ||
          !selectedCity
            ? 'opacity-50 cursor-not-allowed'
            : ''
        }`}
        disabled={
          loadingProvinces ||
          loadingCities ||
          !selectedProvince ||
          !selectedCity
        }
      >
        <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
        <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
        <span className='relative'>
          {loadingProvinces || loadingCities ? 'Loading...' : 'Cari'}
        </span>
      </button>
    </form>
  )
}
