import '@/styles/globals.css'
import Footer from '@/components/footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='font-mono'>
      <div className='bg-white'>{children}</div>
      <Footer />
    </div>
  )
}
