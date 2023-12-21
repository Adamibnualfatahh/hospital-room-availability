'use client'
import '@/styles/globals.css'
import Search from '@/components/search'
import Layout from './layout'
export default function Home() {
  return (
    <Layout>
      <main className='flex min-h-screen flex-col items-center justify-between p-24 bg-white'>
        <div className='w-full max-w-3xl p-4 bg-white border border-black shadow-lg sm:p-6 md:p-8'>
          <Search />
        </div>
        ~
      </main>
    </Layout>
  )
}
